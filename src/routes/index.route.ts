import * as express from "express";

import userAuth from "./user/auth.route";
import promptRoutes from "./prompt/prompt.route";

const router = express.Router();

router.use("/user/auth", userAuth);
router.use("/prompt", promptRoutes);

export default router;
