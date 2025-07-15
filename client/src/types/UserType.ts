export interface IUser {
  type: "ADMIN" | "EMPLOYEE" | "USER";
  firstName: string;
  latName: string;
  email: string;
  password: string;
}
