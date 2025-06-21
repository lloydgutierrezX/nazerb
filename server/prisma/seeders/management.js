import { PrismaClient } from "#root/generated/prisma/client.js";
const prisma = new PrismaClient();

export async function managementSeeder() {
  try {
    // Seed Employee Types
    await prisma.employeeType.createMany({
      data: [
        { code: "regular", name: "Regular", description: "Full-time employee" },
        {
          code: "probationary",
          name: "Probationary",
          description: "On evaluation period",
        },
        {
          code: "contractual",
          name: "Contractual",
          description: "Fixed-term contract",
        },
        {
          code: "project_based",
          name: "Project-Based",
          description: "Project duration only",
        },
        {
          code: "part_time",
          name: "Part-Time",
          description: "Limited hours schedule",
        },
        { code: "intern", name: "Intern", description: "Student or trainee" },
      ],
      skipDuplicates: true,
    });

    // Seed Positions
    await prisma.position.createMany({
      data: [
        {
          code: "tower_engineer",
          name: "Tower Engineer",
          description: "Oversees tower structure and design",
        },
        {
          code: "rigger",
          name: "Rigger",
          description: "Climbs and assembles tower parts",
        },
        {
          code: "foreman",
          name: "Foreman",
          description: "Supervises the construction crew",
        },
        {
          code: "site_supervisor",
          name: "Site Supervisor",
          description: "Manages the construction site",
        },
        {
          code: "qa_inspector",
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
          code: "site_clearance",
          name: "Site Clearance",
          description: "Remove vegetation and debris from site",
        },
        {
          code: "foundation_work",
          name: "Foundation Work",
          description: "Prepare and pour foundation",
        },
        {
          code: "tower_assembly",
          name: "Tower Assembly",
          description: "Assemble tower sections on the ground",
        },
        {
          code: "tower_erection",
          name: "Tower Erection",
          description: "Raise and secure tower in place",
        },
        {
          code: "antenna_install",
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
          code: "sss",
          name: "Social Security System",
          type: "DEBIT",
          description: "Monthly SSS deduction",
        },
        {
          code: "philhealth",
          name: "PhilHealth",
          type: "DEBIT",
          description: "PhilHealth contribution",
        },
        {
          code: "pagibig",
          name: "PAG-IBIG Fund",
          type: "DEBIT",
          description: "PAG-IBIG monthly deduction",
        },
        {
          code: "rice_allowance",
          name: "Rice Allowance",
          type: "CREDIT",
          description: "Monthly rice support",
        },
        {
          code: "transport_subsidy",
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
