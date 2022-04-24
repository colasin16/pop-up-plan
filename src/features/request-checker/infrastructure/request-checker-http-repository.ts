import axios from "axios";
import { Plan } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";
import type { AcceptOrRejectJoinPlanReuqestRepository, JoinPlanRequestStatus } from "../domain/request-checker-repository";

export class AcceptOrRejectJoinRequestPlanHttpRepository implements AcceptOrRejectJoinPlanReuqestRepository {
  private readonly repositorRoot = "http://localhost:8080/plans";


  async acceptOrReject(planId: Id, userId:Id, status:JoinPlanRequestStatus) {
    const response = await axios.patch<undefined, { data: { success: boolean; data: Plan } }>(
      `${this.repositorRoot}/${planId}/accept-or-reject-request`,
      {
        userId,
        status
      }
    );
    return response.data;
  }

}
