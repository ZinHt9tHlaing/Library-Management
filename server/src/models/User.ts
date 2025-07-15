import mongoose, { Document } from "mongoose";
import { IUser } from "../types/user-type";

export interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    latName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const UserModel = mongoose.model<IUserModel>("User", UserSchema);

export default UserModel;
