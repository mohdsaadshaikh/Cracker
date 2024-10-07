import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createFinance,
  deleteFinance,
  getAllFinances,
  updateFinance,
} from "../controllers/finances.controller.js";
import { createFinanceValidator, validate } from "../libs/validator.js";

const router = Router();

router.use(isAuthenticated);

router
  .route("/")
  .get(getAllFinances)
  .post(createFinanceValidator(), validate, createFinance);

router.route("/:id").patch(updateFinance).delete(deleteFinance);

export default router;
