import { User } from "../../../core/domain/user";

export type UserCreationData = Pick<User, "name" | "email" | "phoneNumber" | "password">;
