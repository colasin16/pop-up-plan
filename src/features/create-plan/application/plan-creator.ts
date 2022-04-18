import { inject, injectable } from "tsyringe";
import { PLAN_CREATOR_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

@injectable()
export class PlanCreator {
  constructor(
    @inject(PLAN_CREATOR_REPOSITORY) private readonly planRespository: PlanCreatorRepository,
  ) {}

  public async create(plan: PlanCreationData) {
    return await this.planRespository.create(plan);
  }
}
