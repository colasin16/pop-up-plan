import { Plan, BoringPlan } from "../../../../app/core/shared/domain/plan";
import { User } from "../../../../app/core/shared/domain/user";
import { PersistedObject } from "../../../../app/core/types/persisted-object";
import { PlanCreationData } from "../domain/plan-creation-data";
import { PlanCreatorRepository } from "../domain/plan-creator-repository";

export class PlanCreatorHttpRepository implements PlanCreatorRepository {
  create(owner: User, plan: PlanCreationData): Promise<PersistedObject<Plan>> {
    return Promise.resolve({
      id: "1644013149667",
      ...BoringPlan,
      ...plan,
      owner,
    });
  }
}
