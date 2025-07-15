import { Request, Response } from "express";
import { IUser } from "../../types/user-type";
import { logger } from "../../utils/logger";
import { findUserByEmail, loginService, registerService } from "../../services/user-service";
import { IUserModel } from "../../models/User";

export const handleRegister = async (req: Request, res: Response) => {
  const user: IUser = req.body;

  try {
    const existingUser = await findUserByEmail(user.email);

    if (existingUser) {
      logger.error("User already exists");
      res.status(400).json({ isSuccess: false, message: "User already exists" });
    }

    const registeredUser = await registerService(user);

    // remove password from the response
    const { password, ...userWithoutPassword } = registeredUser.toObject();

    logger.info("Success add new user");
    res.status(201).send({ isSuccess: true, message: "Success register user", user: userWithoutPassword });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json({ isSuccess: false, message: "Unable to register user at this time", error: err.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const user: IUser = req.body;

  try {
    const loggedIn: IUserModel = await loginService(user);

    // remove password from the response
    const { password, ...userWithoutPassword } = loggedIn.toObject();

    logger.info("User logged in successfully");
    res.status(201).send({ isSuccess: true, message: "User logged in successfully", user: userWithoutPassword });
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    res.status(500).json({ isSuccess: false, message: "Unable to login user at this time", error: err.message });
  }
};
