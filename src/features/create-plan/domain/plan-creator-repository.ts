import { Plan } from "../../../../app/core/shared/domain/plan";
import { User } from "../../../../app/core/shared/domain/user";
import { PersistedObject } from "../../../../app/core/types/persisted-object";
import { PlanCreationData } from "./plan-creation-data";

export interface PlanCreatorRepository {
  create(owner: User, plan: PlanCreationData): Promise<PersistedObject<Plan>>;
}
