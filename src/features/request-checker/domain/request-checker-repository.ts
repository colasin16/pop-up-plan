import { Plan } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";

export enum JoinPlanRequestStatus {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

export interface AcceptOrRejectJoinPlanReuqestRepository {
  acceptOrReject(planId:Id, userId:Id,status:JoinPlanRequestStatus): Promise<{ success: boolean; data: Plan }>;
}
