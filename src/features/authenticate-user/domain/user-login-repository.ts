import { UserAuthenticationData } from "./user-login-data";

export interface UserLoginRepository {
  login(userData: UserAuthenticationData): Promise<{ success: boolean; token: string }>;
}
