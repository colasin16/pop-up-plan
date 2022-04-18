import { UserCreationData } from "./user-creation-data";
import { User } from "../../../../app/models/user/user";

export interface UserCreatorRepository {
  create(user: UserCreationData): Promise<{ success: boolean; user: User }>;
}
