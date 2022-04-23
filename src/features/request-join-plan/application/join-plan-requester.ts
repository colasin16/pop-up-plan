import { inject, injectable } from "tsyringe";
import { Id } from "../../../core/domain/types/id";
import { JOIN_PLAN_REQUESTER_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import { JoinPlanRequesterRepository } from "../domain/join-plan-requester-repository";

@injectable()
export class JoinPlanRequester {
  constructor(
    @inject(JOIN_PLAN_REQUESTER_REPOSITORY)
    private readonly planRespository: JoinPlanRequesterRepository,
  ) {}

  public async join(planId: Id, loggedInUserId: Id) {
    return await this.planRespository.join(planId, loggedInUserId);
  }
}
