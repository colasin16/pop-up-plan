import {
  BoringPlan,
  AmazingPlan,
  FarAwayWalkPlan,
  FarAwayRunPlan,
  Plan,
  Category,
} from "../../../core/shared/domain/plan";
import { CustomLocation } from "../../../core/types/location";
import { PersistedObject } from "../../../core/types/persisted-object";
import { PlanListRepository } from "../domain/plan-list-repository";

const plans = [BoringPlan, AmazingPlan, FarAwayWalkPlan, FarAwayRunPlan];
const allPlans = plans.map((plan, index) => ({
  id: `${new Date().setHours(index).valueOf()}`,
  ...plan,
}));

export class PlanListHttpRepository implements PlanListRepository {
  findAll(): Promise<PersistedObject<Plan>[]> {
    return Promise.resolve(allPlans);
  }
  findByCategory(category: Category): Promise<PersistedObject<Plan>[]> {
    return Promise.resolve(allPlans.filter(plan => plan.category === category));
  }
  findByTime(time: number): Promise<PersistedObject<Plan>[]> {
    throw new Error("Method not implemented.");
  }
  findByLocation(location: CustomLocation): Promise<PersistedObject<Plan>[]> {
    throw new Error("Method not implemented.");
  }
}
