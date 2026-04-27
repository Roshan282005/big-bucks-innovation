import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import crmRouter from "./crm";
import contactRouter from "./contact";
import jobsRouter from "./jobs";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use(crmRouter);
router.use(contactRouter);
router.use(jobsRouter);
router.use(usersRouter);

export default router;
