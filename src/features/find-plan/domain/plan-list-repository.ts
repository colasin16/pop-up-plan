import { Plan, Category } from "../../../core/shared/domain/plan";
import { CustomLocation } from "../../../core/types/location";
import { Timestamp } from "../../../core/types/timestamp";

export interface PlanListRepository {
  findAll(): Promise<Plan[]>;
  findByCategory(category: Category): Promise<Plan[]>;
  findByTime(time: Timestamp): Promise<Plan[]>;
  findByLocation(location: CustomLocation): Promise<Plan[]>;
}
