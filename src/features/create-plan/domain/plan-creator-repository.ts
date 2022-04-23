import { Plan } from "../../../core/domain/plan";
import { PlanCreationData } from "./plan-creation-data";

export interface PlanCreatorRepository {
  create(plan: PlanCreationData): Promise<{ success: boolean; data: Plan }>;
}
