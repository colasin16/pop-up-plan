import { UserCreationData } from "./user-creation-data";

export interface UserCreatorRepository {
  create(user: UserCreationData): Promise<{ success: boolean; userId: string }>;
}
