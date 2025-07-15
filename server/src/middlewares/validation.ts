import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import Joi, { ObjectSchema } from "joi";
import { IUser } from "../types/user-type";

export const validationSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const err = error as Error;
      logger.error(err.message);
      return res.status(422).json({ message: "Object validation failed, please include a valid object" });
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "USER").required(),
      firstName: Joi.string().required(),
      latName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(4).required()
    }),
    login: Joi.object<{ email: string; password: string }>({
      email: Joi.string().required(),
      password: Joi.string().min(4).required()
    })
  }
};
