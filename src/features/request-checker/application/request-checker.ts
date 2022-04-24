import { inject, injectable } from "tsyringe";
import { Id } from "../../../core/domain/types/id";
import { ACCEPT_OR_REJECTER_JOIN_PLAN_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import type { AcceptOrRejectJoinPlanReuqestRepository, JoinPlanRequestStatus } from "../domain/request-checker-repository";

@injectable()
export class RequestChecker {
  constructor(
    @inject(ACCEPT_OR_REJECTER_JOIN_PLAN_REPOSITORY) private readonly acceptOrRejectJoinPlanRepository: AcceptOrRejectJoinPlanReuqestRepository,
  ) {}

  public async acceptOrReject(planId: Id, userId: Id,status: JoinPlanRequestStatus) {
    return await this.acceptOrRejectJoinPlanRepository.acceptOrReject(planId, userId, status);
  }

 
}
