import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "cm20q6ilr000012o3e3qo8an8";
const categories = [
  "FOOD",
  "TRAVEL",
  "ENTERTAINMENT",
  "BILLS",
  "SHOPPING",
  "MEDICAL",
  "EDUCATION",
  "INSURANCE",
  "TAXES",
  "CHARITY",
  "BUSINESS",
  "INVESTMENT",
  "OTHER",
];
const paymentMethods = [
  "CASH",
  "CREDIT_CARD",
  "DEBIT_CARD",
  "BANK_TRANSFER",
  "OTHER",
];
const expenseTypes = ["INCOME", "EXPENSE", "INVESTMENT", "SAVINGS", "LOAN"];

const randomFloat = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(2);
const randomBoolean = () => Math.random() < 0.5;

const createFinanceData = () => ({
  userId: userId,
  description: `Sample description for finance record ${Math.floor(
    Math.random() * 1000
  )}`,
  amount: parseFloat(randomFloat(50, 3000)),
  category: categories[Math.floor(Math.random() * categories.length)],
  paymentMethod:
    paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
  type: expenseTypes[Math.floor(Math.random() * expenseTypes.length)],
  recurring: randomBoolean(),
});

async function main() {
  for (let i = 0; i < 60; i++) {
    await prisma.finances.create({
      data: createFinanceData(),
    });
  }
  console.log("20 finance records created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
