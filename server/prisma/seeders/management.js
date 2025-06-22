import { PrismaClient } from "#root/generated/prisma/client.js";
const prisma = new PrismaClient();

export async function managementSeeder() {
  try {
    // Seed Employee Types
    await prisma.employeeType.createMany({
      data: [
        { code: "REGULAR", name: "Regular", description: "Full-time employee" },
        {
          code: "PROBATIONARY",
          name: "Probationary",
          description: "On evaluation period",
        },
        {
          code: "CONTRACTUAL",
          name: "Contractual",
          description: "Fixed-term contract",
        },
        {
          code: "PROJECT_BASED",
          name: "Project-Based",
          description: "Project duration only",
        },
        {
          code: "PART_TIME",
          name: "Part-Time",
          description: "Limited hours schedule",
        },
        { code: "INTERN", name: "Intern", description: "Student or trainee" },
      ],
      skipDuplicates: true,
    });

    // Seed Positions
    await prisma.position.createMany({
      data: [
        {
          code: "TOWER_ENGINEER",
          name: "Tower Engineer",
          description: "Oversees tower structure and design",
        },
        {
          code: "RIGGER",
          name: "Rigger",
          description: "Climbs and assembles tower parts",
        },
        {
          code: "FOREMAN",
          name: "Foreman",
          description: "Supervises the construction crew",
        },
        {
          code: "SITE_SUPERVISOR",
          name: "Site Supervisor",
          description: "Manages the construction site",
        },
        {
          code: "QA_INSPECTOR",
          name: "QA Inspector",
          description: "Ensures quality and compliance",
        },
      ],
      skipDuplicates: true,
    });

    // Seed Tasks
    await prisma.task.createMany({
      data: [
        {
          code: "SITE_CLEARANCE",
          name: "Site Clearance",
          description: "Remove vegetation and debris from site",
        },
        {
          code: "FOUNDATION_WORK",
          name: "Foundation Work",
          description: "Prepare and pour foundation",
        },
        {
          code: "TOWER_ASSEMBLY",
          name: "Tower Assembly",
          description: "Assemble tower sections on the ground",
        },
        {
          code: "TOWER_ERECTION",
          name: "Tower Erection",
          description: "Raise and secure tower in place",
        },
        {
          code: "ANTENNA_INSTALL",
          name: "Antenna Installation",
          description: "Mount antennas and related hardware",
        },
      ],
      skipDuplicates: true,
    });

    // Seed Benefits
    await prisma.benefit.createMany({
      data: [
        {
          code: "SSS",
          name: "Social Security System",
          type: "DEBIT",
          description: "Monthly SSS deduction",
        },
        {
          code: "PHILHEALTH",
          name: "PhilHealth",
          type: "DEBIT",
          description: "PhilHealth contribution",
        },
        {
          code: "PAGIBIG",
          name: "PAG-IBIG Fund",
          type: "DEBIT",
          description: "PAG-IBIG monthly deduction",
        },
        {
          code: "RICE_ALLOWANCE",
          name: "Rice Allowance",
          type: "CREDIT",
          description: "Monthly rice support",
        },
        {
          code: "TRANSPORT_SUBSIDY",
          name: "Transport Subsidy",
          type: "CREDIT",
          description: "Monthly transport help",
        },
      ],
      skipDuplicates: true,
    });

    console.log("✅ Management data seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding management data:", error);
  }
}
