import express, { Router } from "express";
import { handleLogin, handleRegister } from "../../controllers/auth/authController";
import { Schemas, validationSchema } from "../../middlewares/validation";

export const AuthRouter: Router = express.Router();

AuthRouter.post("/register", validationSchema(Schemas.user.create), handleRegister);

AuthRouter.post("/login", validationSchema(Schemas.user.login), handleLogin);
