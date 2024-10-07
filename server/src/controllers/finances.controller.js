import asyncHandler from "express-async-handler";
import { prisma } from "../config/dbConnection.js";
import { ApiError } from "../utils/ApiError.js";

const getAllFinances = asyncHandler(async (req, res, next) => {
  const finances = await prisma.finances.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  if (!finances) {
    return next(new ApiError("No finance record found", 404));
  }

  res.json({
    success: true,
    count: finances.length,
    total: finances.reduce((acc, finance) => finance.amount + acc, 0),
    finances,
  });
});

const createFinance = asyncHandler(async (req, res, next) => {
  const { amount, description, category, paymentMethod, type, recurring } =
    req.body;

  const createFinance = await prisma.finances.create({
    data: {
      userId: req.user.id,
      amount,
      description,
      category,
      paymentMethod,
      type,
      recurring,
    },
  });

  res.json({
    success: true,
    message: "Finance added successfully",
    finance: createFinance,
  });
});

const updateFinance = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new ApiError(
        "No fields provided to update. Please provide at least one field.",
        400
      )
    );
  }

  const updateFinance = await prisma.finances.update({
    where: { id, userId: req.user.id },
    data: req.body,
  });

  if (!updateFinance) {
    return next(new ApiError("Finance not found or not authorized", 404));
  }

  res.json({
    success: true,
    message: "Finance updated successfully",
    finance: updateFinance,
  });
});

const deleteFinance = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deleteFinance = await prisma.finances.delete({
    where: { id, userId: req.user.id },
  });

  if (!deleteFinance) {
    return next(new ApiError("Finance not found or not authorized", 404));
  }

  res.json({ success: true, message: "Finance deleted successfully" });
});

export { getAllFinances, createFinance, updateFinance, deleteFinance };
