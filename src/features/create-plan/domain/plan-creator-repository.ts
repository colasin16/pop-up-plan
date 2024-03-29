import { User } from "../../../core/domain/user";
import { PlanCreationData } from "./plan-creation-data";

export interface PlanCreatorRepository {
  create(owner: User, plan: PlanCreationData): Promise<{ success: boolean; planId: string }>;
}
