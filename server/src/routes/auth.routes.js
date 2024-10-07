import { Router } from "express";
import {
  loginValidator,
  registerValidator,
  validate,
} from "../libs/validator.js";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator(), validate, register);
router.post("/login", loginValidator(), validate, login);

router.get("/logout", isAuthenticated, logout);
router.get("/get-my-profile", isAuthenticated, getMyProfile);

export default router;
