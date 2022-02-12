import axios from "axios";
import { Plan, Category } from "../../../core/shared/domain/plan";
import { CustomLocation } from "../../../core/types/location";
import type { PlanListRepository } from "../domain/plan-list-repository";

export class PlanListHttpRepository implements PlanListRepository {
  private readonly repositorRoot = "localhost";

  async findAll(): Promise<Plan[]> {
    const response = await axios.get<undefined, Plan[]>(`${this.repositorRoot}`);
    return response;
  }

  async findByCategory(category: Category): Promise<Plan[]> {
    const response = await axios.get<undefined, Plan[]>(
      `${this.repositorRoot}/category/${category}`,
    );
    return response;
  }

  async findByTime(time: number): Promise<Plan[]> {
    const response = await axios.get<undefined, Plan[]>(`${this.repositorRoot}/time/${time}`);
    return response;
  }

  async findByLocation(location: CustomLocation): Promise<Plan[]> {
    const response = await axios.get<undefined, Plan[]>(
      `${this.repositorRoot}/location/${location}`,
    );
    return response;
  }
}
