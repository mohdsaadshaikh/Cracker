// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function createMoreFinances() {
//   try {
//     // Data for userId: cm1y0a1xx1000a23ff4c5xyz1
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yo7f340000ooquksxb8x1n",
//         description: "Grocery Shopping",
//         amount: 200.0,
//         category: "FOOD",
//         paymentMethod: "CASH",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yo7f340000ooquksxb8x1n",
//         description: "Monthly Gym Membership",
//         amount: 50.0,
//         category: "OTHER",
//         paymentMethod: "DEBIT_CARD",
//         type: "EXPENSE",
//         recurring: true,
//       },
//     });

//     // Data for userId: cm1y1b7xx000032tpp6f1xyz2
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yo7f340000ooquksxb8x1n",
//         description: "Car Insurance Payment",
//         amount: 300.0,
//         category: "INSURANCE",
//         paymentMethod: "BANK_TRANSFER",
//         type: "EXPENSE",
//         recurring: true,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yo7f340000ooquksxb8x1n",
//         description: "Coffee Subscription",
//         amount: 15.0,
//         category: "FOOD",
//         paymentMethod: "CREDIT_CARD",
//         type: "EXPENSE",
//         recurring: true,
//       },
//     });

//     // Data for userId: cm1y2c3ww1000xyz3a6d0ab1
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yo7f340000ooquksxb8x1n",
//         description: "College Tuition",
//         amount: 1500.0,
//         category: "EDUCATION",
//         paymentMethod: "BANK_TRANSFER",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     await prisma.finances.create({
//       //done
//       data: {
//         userId: "cm1yonp1y0001ooquicuqw192",
//         description: "Laptop for Study",
//         amount: 1200.0,
//         category: "SHOPPING",
//         paymentMethod: "DEBIT_CARD",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     // Data for userId: cm1y3d7xx2000xyz4ff9d4cc
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yonp1y0001ooquicuqw192",
//         description: "Rent Payment",
//         amount: 900.0,
//         category: "BILLS",
//         paymentMethod: "BANK_TRANSFER",
//         type: "EXPENSE",
//         recurring: true,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yonp1y0001ooquicuqw192",
//         description: "Charity Contribution",
//         amount: 100.0,
//         category: "CHARITY",
//         paymentMethod: "CREDIT_CARD",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     // Data for userId: cm1y4e5xx3000xyz5b0b6bb2 /done
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yonp1y0001ooquicuqw192",
//         description: "Investment in Real Estate",
//         amount: 10000.0,
//         category: "INVESTMENT",
//         paymentMethod: "BANK_TRANSFER",
//         type: "INVESTMENT",
//         recurring: false,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yonp1y0001ooquicuqw192",
//         description: "Annual Health Insurance",
//         amount: 500.0,
//         category: "INSURANCE",
//         paymentMethod: "BANK_TRANSFER",
//         type: "EXPENSE",
//         recurring: true,
//       },
//     });

//     await prisma.finances.create({
//       //done
//       data: {
//         userId: "cm1yoocg10002ooquqfx8cjda",
//         description: "Groceries",
//         amount: 150.0,
//         category: "FOOD",
//         paymentMethod: "CASH",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yoocg10002ooquqfx8cjda", //done
//         description: "Movie Tickets",
//         amount: 50.0,
//         category: "ENTERTAINMENT",
//         paymentMethod: "CREDIT_CARD",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     // Data for userId: cm1w9ed7m0000pjjhp9i0mcab //done
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yoocg10002ooquqfx8cjda",
//         description: "Monthly Rent",
//         amount: 800.0,
//         category: "BILLS",
//         paymentMethod: "BANK_TRANSFER",
//         type: "EXPENSE",
//         recurring: true,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yoocg10002ooquqfx8cjda",
//         description: "Laptop Purchase",
//         amount: 1200.0,
//         category: "SHOPPING",
//         paymentMethod: "DEBIT_CARD",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     // Data for userId: cm1w9lda50000cra7e6nayq0y //done
//     await prisma.finances.create({
//       data: {
//         userId: "cm1yoocg10002ooquqfx8cjda",
//         description: "Investment in Stocks",
//         amount: 5000.0,
//         category: "INVESTMENT",
//         paymentMethod: "BANK_TRANSFER",
//         type: "INVESTMENT",
//         recurring: false,
//       },
//     });

//     await prisma.finances.create({
//       data: {
//         userId: "cm1yo7f340000ooquksxb8x1n",
//         description: "Charity Donation",
//         amount: 100.0,
//         category: "CHARITY",
//         paymentMethod: "CREDIT_CARD",
//         type: "EXPENSE",
//         recurring: false,
//       },
//     });

//     console.log("users finances created successfully!");
//   } catch (error) {
//     console.error("Error creating finances: ", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// createMoreFinances();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "cm27sy5ye0000le1jc9u2zgey"; // Tumhara userId
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
  for (let i = 0; i < 20; i++) {
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
