import { Plan, Category } from "../../../core/shared/domain/plan";
import { CustomLocation } from "../../../core/types/location";
import { Timestamp } from "../../../core/types/timestamp";

export interface PlanListRepository {
  findAll(): Promise<{ success: boolean; plans: Plan[] }>;
  findByCategory(category: Category): Promise<{ success: boolean; plans: Plan[] }>;
  findByTime(time: Timestamp): Promise<{ success: boolean; plans: Plan[] }>;
  findByLocation(location: CustomLocation): Promise<{ success: boolean; plans: Plan[] }>;
}
