import { User } from "../../../core/domain/user";

export type UserCreationData = Pick<
  User,
  "name" | "lastName" | "email" | "phoneNumber" | "newPassword"
>;
