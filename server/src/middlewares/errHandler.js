import { ApiError } from "../utils/ApiError.js";
import { Prisma } from "@prisma/client";

const handleUniqueConstraintError = (err) => {
  const target = err.meta?.target;
  const fields = Array.isArray(target) ? target.join(", ") : target;
  return new ApiError(
    `Duplicate field value for: ${fields}. Please use another value!`,
    400
  );
};

const handleValidationError = (err) => {
  let message = "Invalid input data: Unknown validation error.";

  // Check if err.errors exists and is an object
  if (err.errors && typeof err.errors === "object") {
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(". ");
  } else if (err.message) {
    message = err.message;
  }

  // Check for specific validation errors
  if (message.includes("Argument `")) {
    const argMissingMatch = message.match(/Argument `(.*?)` is missing/);
    if (argMissingMatch) {
      message = `Missing required argument: ${argMissingMatch[1]}. Please provide it.`;
    }
  }

  // Check for invalid values error
  const specificMessageMatch = message.match(
    /Invalid value for argument `(.*?)`. Expected (.*?)/
  );
  if (specificMessageMatch) {
    message = `Invalid value for argument ${specificMessageMatch[1]}. Please use a valid value.`;
  }

  return new ApiError(message, 400);
};

const handleRecordNotFoundError = (err) => {
  const message = err.meta?.cause || "Record not found.";
  return new ApiError(message, 404);
};

const handleJWTError = () =>
  new ApiError("Invalid Token. Please Login again", 401);

const handleJWTExpire = () =>
  new ApiError("Token has expired. Please Login again", 401);

// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") err = handleUniqueConstraintError(err);
    else if (err.code === "P2025") err = handleRecordNotFoundError(err);
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    err = handleValidationError(err);
  } else if (err.name === "JsonWebTokenError") err = handleJWTError();
  else if (err.name === "TokenExpiredError") err = handleJWTExpire();

  const response = {
    success: false,
    message: err.message,
  };

  if (process.env.NODE_ENV.trim() === "development") {
    response.stack = err.stack;
  }

  return res.status(err.statusCode).json(response);
};

export default globalErrorHandler;
