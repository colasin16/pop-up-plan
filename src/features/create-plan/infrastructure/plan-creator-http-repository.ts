import axios from "axios";
import { Repository } from "../../../../app/base/respository";
import { Plan } from "../../../core/domain/plan";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class PlanCreatorHttpRepository extends Repository implements PlanCreatorRepository {
  private readonly repositoryRoot = "http://localhost:8080/plans";

  async create(planToCreate: PlanCreationData) {
    try {
      const response = await axios.post<PlanCreationData, { data: { success: boolean; data: Plan } }>(
        `${this.repositoryRoot}`,
        planToCreate, await this.getConfig()
      );
      return response.data;

    } catch (error) {
      this.handleAxiosError(error)
    }

    return Promise.resolve({ success: false, data: null })
  }
}
