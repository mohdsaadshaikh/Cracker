import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

export { prisma, connectToDB };
