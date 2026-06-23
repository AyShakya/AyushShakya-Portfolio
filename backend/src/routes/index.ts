import { Router } from "express";
import healthRouter from "./healthRoutes.js";
import projectRouter from "./projectRoutes.js";
import experienceRouter from "./experienceRoutes.js";
import journeyRouter from "./journeyRoutes.js";
import noteRouter from "./noteRoutes.js";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use(projectRouter);
apiRouter.use(experienceRouter);
apiRouter.use(journeyRouter);
apiRouter.use(noteRouter);

export default apiRouter;
