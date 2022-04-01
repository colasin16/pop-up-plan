import axios, { AxiosError, AxiosResponse } from "axios";
import { UserCreationData } from "../domain/user-creation-data";
import { UserCreatorRepository } from "../domain/user-creator-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class UserCreatorHttpRepository implements UserCreatorRepository {
  private readonly repositoryRoot = "http://localhost:8080/user";

  async create(user: UserCreationData) {
    try {
      const response = await axios.post<
        UserCreationData,
        // { success: boolean; userId: string }
        AxiosResponse
      >(`${this.repositoryRoot}`, {
        ...user,
      });

      const { success, userId } = response.data;

      console.debug(`async create, userId: ${userId}`);

      return { success, userId };
    } catch (error) {
      const err = error as AxiosError;

      console.error(`Error during creating a new user..., ${err.message}`);
      if (err.response) {
        console.debug(err.response.status);
        console.debug(err.response.data);
      }
      // this.handleAxiosError(error)
    }
  }
}
