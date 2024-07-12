import { signin, signup } from "@controllers/authController";
import { requestValidator } from "@middlewares/requestValidator";
import { signinSchema, signupSchema } from "@utils/validation";
import express from "express";

const router = express.Router();

router.post("/signup", requestValidator(signupSchema), signup);
router.post("/signin", requestValidator(signinSchema), signin);

export default router;
