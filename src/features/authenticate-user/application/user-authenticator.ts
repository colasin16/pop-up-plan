import { inject, injectable } from "tsyringe";
import { USER_AUTHENTICATOR_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import { UserAuthenticationData } from "../domain/user-login-data";
import { UserAuthenticatorHttpRepository } from "../infrastructure/user-login-http-repository";

@injectable()
export class UserAuthenticator {
  constructor(
    @inject(USER_AUTHENTICATOR_REPOSITORY)
    private readonly userRespository: UserAuthenticatorHttpRepository,
  ) {}

  public async login(authenticationData: UserAuthenticationData) {
    return await this.userRespository.login(authenticationData);
  }
}
