import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { prisma } from "../config/dbConnection.js";
import asyncHandler from "express-async-handler";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = req.cookies["Token"];
  console.log(token)

  if (!token) {
    return next(new ApiError("Not authenticated", 401));
  }

  let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
    },
  });

  if (!currentUser) {
    return next(
      new ApiError("The user belonging to this token no longer exists.", 401)
    );
  }

  req.user = currentUser;
  next();
});

export { isAuthenticated };
