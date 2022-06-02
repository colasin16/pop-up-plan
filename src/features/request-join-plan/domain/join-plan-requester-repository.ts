import { Plan } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";

export interface JoinPlanRequesterRepository {
  join(planId: Id, loggedInUserId: Id): Promise<{ success: boolean; data: Plan }>;
}
