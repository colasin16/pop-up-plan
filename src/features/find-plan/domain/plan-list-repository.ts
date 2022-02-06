import { Plan, Category } from "../../../../app/core/shared/domain/plan";
import { CustomLocation } from "../../../../app/core/types/location";
import { PersistedObject } from "../../../../app/core/types/persisted-object";
import { Timestamp } from "../../../../app/core/types/timestamp";

export interface PlanListRepository {
  findAll(): Promise<PersistedObject<Plan>[]>;
  findByCategory(category: Category): Promise<PersistedObject<Plan>[]>;
  findByTime(time: Timestamp): Promise<PersistedObject<Plan>[]>;
  findByLocation(location: CustomLocation): Promise<PersistedObject<Plan>[]>;
}
