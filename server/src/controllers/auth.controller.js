import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { prisma } from "../config/dbConnection.js";
import { ApiError } from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import { cookieOptions } from "../constants/options.js";

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (userExist) {
    return next(
      new ApiError(
        "Email already registered. Please try with a different email.",
        400
      )
    );
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  const token = generateToken({ id: createUser.id });

  res
    .status(201)
    .cookie("Token", token, cookieOptions)
    .json({ success: true, message: "User registered successfully", token });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return next(new ApiError("There is no user with this email", 401));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new ApiError("Password is incorrect", 401));
  }

  const token = generateToken({ id: user.id });

  res
    .status(201)
    .cookie("Token", token, { ...cookieOptions, domain: 'http://localhost:5173' })
    .json({ success: true, message: "User Loggedin successfully", token });
});

const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("Token");
  res.json({ success: true, message: "Logged out successfully" });
});

const getMyProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res.json({ success: true, user });
});

export { register, login, getMyProfile, logout };
