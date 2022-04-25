import axios, { AxiosError, AxiosResponse } from "axios";
import { Repository } from "../../../../app/base/respository";
import { ToastPIC } from "../../../../app/utils/toast";
import { UserAuthenticationData } from "../domain/user-login-data";
import { UserLoginRepository } from "../domain/user-login-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class UserAuthenticatorHttpRepository extends Repository implements UserLoginRepository {
  private readonly repositoryRoot = "http://localhost:8080/login";

  async login(authenticationData: UserAuthenticationData) {
    try {
      const response = await axios.post<UserAuthenticationData, AxiosResponse>(
        `${this.repositoryRoot}`,
        {
          ...authenticationData,
        },
      );

      const { success, data } = response.data;
      const { token, user } = data;

      console.debug(`response.data: ${JSON.stringify(response.data)}`);
      console.debug(`async login, token: ${token}`);

      return { success, token, user };
    } catch (error) {
      this.handleAxiosError(error)
    }

    return Promise.resolve({ success: false, token: null, user: null })

  }
}
