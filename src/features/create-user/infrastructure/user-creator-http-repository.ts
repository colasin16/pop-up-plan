import axios, { AxiosError, AxiosResponse } from "axios";
import { UserCreationData } from "../domain/user-creation-data";
import { UserCreatorRepository } from "../domain/user-creator-repository";
import { User } from "../../../../app/models/user/user";
import { Repository } from "../../../../app/base/respository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class UserCreatorHttpRepository extends Repository implements UserCreatorRepository {
  private readonly repositoryRoot = "http://localhost:8080/users";

  async create(userToCreate: UserCreationData): Promise<{ success: boolean; data: User }> {
    try {
      const response = await axios.post<UserCreationData, AxiosResponse>(`${this.repositoryRoot}`, {
        ...userToCreate,
      });

      // TODO: define type for user
      const { success, data }: { success: boolean; data: User } = response.data;

      return { success, data };
    } catch (error) {
      this.handleAxiosError(error)
    }

    return Promise.resolve({ success: false, data: null })
  }
}
