import axios from "axios";
import { Plan, Category } from "../../../core/domain/plan";
import { CustomLocation } from "../../../core/domain/types/location";
import type { PlanListRepository } from "../domain/plan-list-repository";

export class PlanListHttpRepository implements PlanListRepository {
  private readonly repositorRoot = "http://localhost:8080/plans";

  async findAll() {
    const response = await axios.get<undefined, { data: { success: boolean; plans: Plan[] } }>(
      `${this.repositorRoot}`,
    );
    return response.data;
  }

  async findByCategory(category: Category) {
    const response = await axios.get<undefined, { data: { success: boolean; plans: Plan[] } }>(
      `${this.repositorRoot}/${category}`,
    );
    return response.data;
  }

  async findByTime(time: number) {
    const response = await axios.get<undefined, { data: { success: boolean; plans: Plan[] } }>(
      `${this.repositorRoot}/time/${time}`,
    );
    return response.data;
  }

  async findByLocation(location: CustomLocation) {
    const response = await axios.get<undefined, { data: { success: boolean; plans: Plan[] } }>(
      `${this.repositorRoot}/location/${location}`,
    );
    return response.data;
  }
}
