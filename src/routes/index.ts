import { Router } from "express";
import authRouter from "./authRoutes";
import todoRouter from "./todoRoutes";

const router = Router();
router.use("/user", authRouter);
router.use("/todo", todoRouter);

export default router;