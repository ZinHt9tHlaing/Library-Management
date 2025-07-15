import express, { Router } from "express";
import { handleRegister } from "../../controllers/auth/authController";
import { Schemas, validationSchema } from "../../middlewares/validation";

export const AuthRouter: Router = express.Router();

AuthRouter.post("/register", validationSchema(Schemas.user.create), handleRegister);
