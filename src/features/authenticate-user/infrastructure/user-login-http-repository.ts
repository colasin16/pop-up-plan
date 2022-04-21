import axios, { AxiosError, AxiosResponse } from "axios";
import { UserAuthenticationData } from "../domain/user-login-data";
import { UserLoginRepository } from "../domain/user-login-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class UserAuthenticatorHttpRepository implements UserLoginRepository {
  private readonly repositoryRoot = "http://localhost:8080/login";

  async login(authenticationData: UserAuthenticationData) {
    try {
      const response = await axios.post<
        UserAuthenticationData,
        AxiosResponse
      >(`${this.repositoryRoot}`, {
        ...authenticationData,
      });

      const { success, token, user } = response.data;

      console.debug(`response.data: ${JSON.stringify(response.data)}`);
      console.debug(`async login, token: ${token}`);

      return { success, token, user };
    } catch (error) {
      const err = error as AxiosError;

      console.error(`Error during creating a new user..., ${err.message}`);
      if (err.response) {
        console.debug(err.response.status);
        console.debug(err.response.data);
      }
      // TODO: writig something like util or helper to mange erorr handling (e.g. logging and ...)
      // this.handleAxiosError(error)
      throw error;
    }
  }
}
