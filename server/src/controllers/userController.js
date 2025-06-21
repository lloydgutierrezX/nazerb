import { consoleLog } from "../utils.js";
import { create, findMany, findUnique, update } from "../hepers/index.js";

const module = "user";

// Function to create a new user
export const createUser = async (req, res) => {
  consoleLog("Entering createUser fn", "title");
  const {
    roleId,
    email,
    active,
    password,
    firstName,
    middleName,
    lastName,
    birthdate,
    mobileNumber,
    maritalStatus,
    gender,
    nationality,
    provinceCode,
    barangayCode,
    zipCode,
    address,
  } = req.body;

  try {
    if (await findUnique(module, { email: email })) {
      return res.status(409).json({
        message: `Email ${email} is already taken`,
        fields: ["email"],
      });
    }

    if (await findUnique("userBasicInfo", { mobileNumber })) {
      return res.status(409).json({
        message: `Mobile number ${mobileNumber} is already taken`,
        fields: ["mobileNumber"],
      });
    }

    // checking roleId if exist
    if (!(await findUnique("role", { id: roleId }))) {
      return res.status(404).json({
        message: `Role not found`,
        fields: ["role"],
      });
    }

    // Create the new user
    const newUser = await create(
      module,
      {
        email,
        roleId,
        password: hashedPassword(password),
        active,
      },
      {
        select: {
          email,
          roleId,
          active,
          createdAt,
          updatedAt,
        },
      }
    );

    const userBasicInfo = await create("userBasicInfo", {
      userId: newUser.id,
      firstName,
      middleName,
      lastName,
      birthdate: parseNormalizeDate(birthdate),
      mobileNumber,
      maritalStatus,
      gender,
      nationality,
      provinceCode,
      barangayCode,
      zipCode,
      address,
    });

    // Return the created module
    return res.status(201).json(newUser);
  } catch (error) {
    consoleLog(error, "error");

    // If the module does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to create module" });
  } finally {
    consoleLog("Leaving createUser fn", "title");
  }
};

// Function to get all user
export const getUsers = async (req, res) => {
  consoleLog("Fetching all modules", "title");

  try {
    const modules = await findMany(module, {
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(modules);
  } catch (error) {
    consoleLog(error, "error");

    // If the modules do not exist, return a 404 error
    return res.status(500).json({ message: "Failed to fetch modules" });
  } finally {
    console.log("Leaving getUsers fn", "title");
  }
};

// Function to update a user
export const updateUser = async (req, res) => {
  console.log(`Updating user with ID: ${req.params.id}`);

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    consoleLog(`Invalid user ID: ${id}`);
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { name, description, active } = req.body;
  const unique = await findUnique(module, { id: parseInt(id) });

  // Check if the user exists
  if (!unique) {
    // If the user does not exist, return a 404 error
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Update the user
    consoleLog(`Updating user with ID ${id}`);

    // Check if the user name already exists
    if (name === unique.name && id != unique.id) {
      return res
        .status(409)
        .json({ message: `User ${name} is already taken`, fields: ["name"] });
    }

    // Update the user
    const userData = {
      active,
      description,
    };

    if (name !== unique.name) {
      userData.name = name;
    }
    const updatedUser = await update(module, userData, {
      id: parseInt(id),
    });

    // Return the updated user
    return res.status(200).json(updatedUser);
  } catch (error) {
    consoleLog(error, "error");
    // If the user does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to update user" });
  } finally {
    consoleLog("Leaving updateUser fn", "title");
  }
};

// Function to SOFT delete a module
export const deleteUser = async (req, res) => {
  consoleLog(`Soft deleting user with ID: ${req.params.id}`, "title");

  // Check if the ID is a valid number
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  // Check if the user exists
  if (!(await findUnique(module, { id: parseInt(id) }))) {
    // If the user does not exist, return a 404 error
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Soft delete the user by updating its active to false
    const deletedUser = await update(
      module,
      { active: false },
      { id: parseInt(id) }
    );
    // Return the deleted user
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(`Soft deleting user with ID ${id} failed`, error);
    // If the user does not exist, return a 404 error
    return res.status(500).json({ message: "Failed to delete user" });
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
