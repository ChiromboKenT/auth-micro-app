
import express from "express";
import { requestValidator } from "../middleware/requestValidator";
import { signinSchema, signupSchema } from "../utils/validation";
import { signin, signup } from "../controllers/authController";

const router = express.Router();

router.post("/signup", requestValidator(signupSchema), signup);
router.post("/signin", requestValidator(signinSchema), signin);

export default router;
