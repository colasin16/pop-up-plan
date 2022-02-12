import axios from "axios";

import { Plan } from "../../../core/shared/domain/plan";
import { User } from "../../../core/shared/domain/user";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

export class PlanCreatorHttpRepository implements PlanCreatorRepository {
  private readonly repositoryRoot = "localhost";

  async create(owner: User, plan: PlanCreationData): Promise<Plan> {
    const response = await axios.post<PlanCreationData, Plan>(`${this.repositoryRoot}/8080`, {
      ...plan,
      owner,
    });
    return response;
  }
}
