import { User } from "../../../core/shared/domain/user";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

export class PlanCreator {
  constructor(private readonly planRespository: PlanCreatorRepository) {}

  public async create(owner: User, plan: PlanCreationData) {
    return await this.planRespository.create(owner, plan);
  }
}
