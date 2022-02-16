import { Category, Plan } from "../../../core/domain/plan";
import { CustomLocation } from "../../../core/domain/types/location";
import { Timestamp } from "../../../core/domain/types/timestamp";

export interface PlanListRepository {
  findAll(): Promise<{ success: boolean; plans: Plan[] }>;
  findByCategory(category: Category): Promise<{ success: boolean; plans: Plan[] }>;
  findByTime(time: Timestamp): Promise<{ success: boolean; plans: Plan[] }>;
  findByLocation(location: CustomLocation): Promise<{ success: boolean; plans: Plan[] }>;
}
