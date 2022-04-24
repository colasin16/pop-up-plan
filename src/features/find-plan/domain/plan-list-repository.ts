import { Category, Plan } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";
import { CustomLocation } from "../../../core/domain/types/location";
import { Timestamp } from "../../../core/domain/types/timestamp";
import { User } from "../../../core/domain/user";

export interface PlanListRepository {
  get(planId:Id): Promise<{ success: boolean; data: Plan }>;
  findAll(): Promise<{ success: boolean; data: Plan[] }>;
  findByCategory(category: Category): Promise<{ success: boolean; data: Plan[] }>;
  findByTime(time: Timestamp): Promise<{ success: boolean; data: Plan[] }>;
  findByLocation(location: CustomLocation): Promise<{ success: boolean; data: Plan[] }>;
  findByOwner(owner: User): Promise<{ success: boolean; data: Plan[] }>;
}
