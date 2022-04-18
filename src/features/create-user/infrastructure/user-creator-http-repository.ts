import axios, { AxiosError, AxiosResponse } from "axios";
import { UserCreationData } from "../domain/user-creation-data";
import { UserCreatorRepository } from "../domain/user-creator-repository";
import { User } from "../../../../app/models/user/user";

// The mock of this repository is the same as the mock because rightnow they do the same
export class UserCreatorHttpRepository implements UserCreatorRepository {
  private readonly repositoryRoot = "http://localhost:8080/users";

  async create(userToCreate: UserCreationData): Promise<{ success: boolean; user: User }> {
    try {
      const response = await axios.post<
        UserCreationData,
        // { success: boolean; userId: string }
        AxiosResponse
      >(`${this.repositoryRoot}`, {
        ...userToCreate,
      });

      // TODO: define type for user
      const { success, user }: { success: boolean; user: User } = response.data;

      console.debug(`async create, user: ${user}`);

      return { success, user };
    } catch (error) {
      const err = error as AxiosError;

      console.error(`Error during creating a new user..., ${err.message}`);
      if (err.response) {
        console.debug(err.response.status);
        console.debug(err.response.data);
      }
      // this.handleAxiosError(error)

      throw error;
    }
  }
}
