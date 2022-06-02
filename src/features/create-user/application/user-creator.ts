import { inject, injectable } from "tsyringe";
import { USER_CREATOR_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import { UserCreationData } from "../domain/user-creation-data";
import { UserCreatorRepository } from "../domain/user-creator-repository";

@injectable()
export class UserCreator {
  constructor(
    @inject(USER_CREATOR_REPOSITORY) private readonly userRespository: UserCreatorRepository,
  ) {}

  public async create(user: UserCreationData) {
    return await this.userRespository.create(user);
  }
}
