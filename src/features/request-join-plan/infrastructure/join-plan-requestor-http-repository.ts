import axios from "axios";
import { Plan } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";
import { JoinPlanRequestData } from "../domain/join-plan-requester-data";
import { JoinPlanRequesterRepository } from "../domain/join-plan-requester-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class JoinPlanRequestHttpRepository implements JoinPlanRequesterRepository {
  private readonly repositoryRoot = "http://localhost:8080/plans";

  async join(planId: Id, loggedInUserId: Id) {
    const response = await axios.patch<
      JoinPlanRequestData,
      { data: { success: boolean; data: Plan } }
    >(`${this.repositoryRoot}/${planId}/join-request`, {
      userId: loggedInUserId,
    });

    return response.data;
  }
}
