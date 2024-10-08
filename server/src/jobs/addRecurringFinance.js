import cron from "node-cron";
import { prisma } from "../config/dbConnection.js";
import logger from "../config/logger.js";

const isOneMonthPassed = (createdAt) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return createdAt <= oneMonthAgo;
};

const processRecurringFinances = async () => {
  try {
    const recurringFinances = await prisma.finances.findMany({
      where: { recurring: true },
    });

    for (const finance of recurringFinances) {
      if (isOneMonthPassed(finance.createdAt)) {
        await prisma.finances.create({
          data: {
            userId: finance.userId,
            amount: finance.amount,
            description: finance.description,
            category: finance.category,
            paymentMethod: finance.paymentMethod,
            type: finance.type,
            recurring: finance.recurring,
          },
        });

        logger.info(
          `Processed recurring finance for userId: ${finance.userId}, amount: ${finance.amount}`
        );
      }
    }

    logger.info("All due recurring finances processed successfully");
  } catch (error) {
    logger.error("Error processing recurring finances", error);
  }
};

// Schedule job to run every minute (for testing)
cron.schedule("0 0 * * *", async () => {
  logger.info("Running cron job for processing recurring finances");
  await processRecurringFinances();
});
