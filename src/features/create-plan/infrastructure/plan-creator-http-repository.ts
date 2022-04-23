import axios from "axios";
import { Plan } from "../../../core/domain/plan";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class PlanCreatorHttpRepository implements PlanCreatorRepository {
  private readonly repositoryRoot = "http://localhost:8080/plans";

  async create(planToCreate: PlanCreationData) {
    const response = await axios.post<PlanCreationData, { data: { success: boolean; data: Plan } }>(
      `${this.repositoryRoot}`,
      planToCreate,
    );

    return response.data;
  }
}
