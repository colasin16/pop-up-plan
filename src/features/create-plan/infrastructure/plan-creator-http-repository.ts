import axios from "axios";

import { User } from "../../../core/shared/domain/user";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

// The mock of this repository is the same as the mock because rightnow they do the same
export class PlanCreatorHttpRepository implements PlanCreatorRepository {
  private readonly repositoryRoot = "http://localhost:8080/plan";

  async create(owner: User, plan: PlanCreationData) {
    const { success, planId } = await axios.post<
      PlanCreationData,
      { success: boolean; planId: string }
    >(`${this.repositoryRoot}`, {
      ...plan,
      owner,
    });

    return { success, planId };
  }
}
