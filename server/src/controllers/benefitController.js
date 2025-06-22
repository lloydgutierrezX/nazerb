import { consoleLog, isExist } from "../utils.js";
import {
  create,
  findMany,
  findUnique,
  validateDuplicate,
  update,
} from "../hepers/index.js";

const module = "benefit";

const validateBenefitType = (type) => {
  if (type && !isExist(["DEBIT", "CREDIT"], type)) {
    return {
      message: `Benefit type must be either 'debit' or 'credit'`,
      fields: ["type"],
    };
  }

  return undefined;
};

// Function to create a new benefit
export const createBenefit = async (req, res) => {
  consoleLog("Entering createBenefit fn", "title");
  const { name, description, code, active, type } = req.body;

  try {
    if (
      await validateDuplicate(module, {
        name: { equals: name, mode: "insensitive" },
      })
    ) {
      return res
        .status(409)
        .json({ message: `Name ${name} is taken already.`, fields: ["name"] });
    }

    if (await validateDuplicate(module, { code })) {
      return res
        .status(409)
        .json({ message: `Code ${code} is taken already.`, fields: ["code"] });
    }

    // Validate the benefit type
    const validatedBenefitType = validateBenefitType(type);
    if (validatedBenefitType) {
      return res.status(400).json({
        message: validateBenefitType.message,
        fields: [...validateBenefitType.fields],
      });
    }

    // Create the new benefit
    const newBenefit = await create(module, {
      name,
      type,
      code,
      active,
      description,
    });

    // Return the created benefit
    return res.status(201).json(newBenefit);
  } catch (error) {
    consoleLog(error, "error");

    // If the benefit does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create benefit" });
  } finally {
    consoleLog("Leaving createBenefit fn", "title");
  }
};

// Function to get all benefit
export const getBenefites = async (req, res) => {
  consoleLog("Fetching all benefit", "title");

  try {
    const benefit = await findMany(module, {
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(benefit);
  } catch (error) {
    consoleLog(error, "error");

    // If the benefit do not exist, return a 404 error
    return res.status(500).json({ message: "Failed to fetch benefit" });
  } finally {
    console.log("Leaving getBenefit fn", "title");
  }
};

// Function to update a benefit
export const updateBenefit = async (req, res) => {
  console.log(`Updating benefit with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid benefit ID: ${id}`);
    return res.status(400).json({ message: "Invalid benefit ID" });
  }

  const { name, description, active, type, code } = req.body;

  // checking enum benefits if the passed value is correct.
  const validatedBenefitType = validateBenefitType(type);
  if (validatedBenefitType) {
    return res.status(validateBenefitType.errorCode).json({
      message: validateBenefitType.message,
      fields: [...validateBenefitType.fields],
    });
  }

  const record = await findUnique(module, { id: parseInt(id) });
  // Checking benefit if id exists in current records
  if (!record) {
    // If the benefit does not exist, return a 404 error
    return res
      .status(404)
      .json({ message: "Benefit not found", fields: ["type"] });
  }

  if (
    name !== record.name &&
    (await validateDuplicate(module, {
      AND: [
        { name: { equals: name, mode: "insensitive" } },
        { id: { not: parseInt(record.id) } },
      ],
    }))
  ) {
    return res
      .status(409)
      .json({ message: `Name ${name} is taken already.`, fields: ["name"] });
  }

  if (
    code !== record.code &&
    (await validateDuplicate(module, {
      AND: [{ code }, { id: { not: parseInt(record.id) } }],
    }))
  ) {
    return res
      .status(409)
      .json({ message: `Code ${code} is taken already.`, fields: ["code"] });
  }

  try {
    // Update the benefit
    consoleLog(`Updating benefit with ID ${id}`);

    const benefitData = {
      active,
      description,
      type,
    };

    if (name !== record.name) {
      benefitData.name = name;
    }

    if (code !== record.code) {
      benefitData.code = code;
    }

    const updatedBenefit = await update(module, benefitData, {
      id: parseInt(id),
    });

    // Return the updated benefit
    return res.status(200).json(updatedBenefit);
  } catch (error) {
    consoleLog(error, "error");
    // If the benefit does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update benefit" });
  } finally {
    consoleLog("Leaving getBenefites fn", "title");
  }
};

// Function to SOFT delete an benefit
export const deleteBenefit = async (req, res) => {
  consoleLog(`Soft deleting benefit with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid benefit ID" });
  }

  // Check if the benefit exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the benefit does not exist, return a 404 error
    return res.status(404).json({ message: "Benefit not found" });
  }

  try {
    // Soft delete the benefit by updating its active to false
    const deletedModule = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted benefit
    return res.status(200).json(deletedModule);
  } catch (error) {
    console.log(`Soft deleting benefit with ID ${id} failed`, error);
    // If the benefit does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete benefit" });
  }

  // We do not hard delete data.
  // try {
  //   await prisma.module.delete({
  //     where: { id: parseInt(id) },
  //   });
  //   res.status(204).send();
  // } catch (error) {
  //   res.status(500).json({ message: "Failed to delete module" });
  // }
};
