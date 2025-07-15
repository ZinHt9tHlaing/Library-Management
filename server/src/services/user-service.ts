import bcrypt from "bcrypt";
import { IUser } from "../types/user-type";
import UserModel, { IUserModel } from "../models/User";
import { config } from "../config";
import { logger } from "../utils/logger";
import { InvalidUsernameOrPasswordError, UnableToSaveUseError } from "../utils/LibraryErrors";

export const registerService = async (user: IUser): Promise<IUserModel> => {
  const ROUNDS = config.serverPort.rounds;

  try {
    const hashedPassword = bcrypt.hashSync(user.password, ROUNDS);

    const saved = new UserModel({ ...user, password: hashedPassword });

    return await saved.save();
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    throw new UnableToSaveUseError(err.message);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    logger.info("Cannot get user from DB");
    logger.error(error);
  }
};

export const loginService = async (credentials: { email: string; password: string }): Promise<IUserModel> => {
  const { email, password } = credentials;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new InvalidUsernameOrPasswordError("User not found");
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new InvalidUsernameOrPasswordError("Invalid credentials");
    }

    return user;
  } catch (error) {
    const err = error as Error;
    logger.error(err.message);
    throw new InvalidUsernameOrPasswordError(err.message);
  }
};
