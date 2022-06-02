import axios from "axios";
import { Repository } from "../../../../app/base/respository";
import { Plan } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";
import type { AcceptOrRejectJoinPlanReuqestRepository, JoinPlanRequestStatus } from "../domain/request-checker-repository";

export class AcceptOrRejectJoinRequestPlanHttpRepository extends Repository implements AcceptOrRejectJoinPlanReuqestRepository {
  private readonly repositorRoot = "http://localhost:8080/plans";


  async acceptOrReject(planId: Id, userId: Id, status: JoinPlanRequestStatus) {
    try {
      const response = await axios.patch<undefined, { data: { success: boolean; data: Plan } }>(
        `${this.repositorRoot}/${planId}/accept-or-reject-request`,
        {
          userId,
          status
        },
        await this.getConfig()
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

}
