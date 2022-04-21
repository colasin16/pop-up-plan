import axios from "axios";
import { Plan, Category } from "../../../core/domain/plan";
import { CustomLocation } from "../../../core/domain/types/location";
import { User } from "../../../core/domain/user";
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

  async findByOwner(owner: User) {
    // TODO: implement api in backend
    // const url: string = `${this.repositorRoot}/owner/${owner.id}`

    const { plans } = await this.findAll();

    const ownersPlan = plans.filter(plan => plan.ownerId === owner.id);

    return { success: true, plans: ownersPlan };
    // throw new Error(`API ('${url}') Not implemented in backend`);
    // const response = await axios.get<undefined, { data: { success: boolean; plans: Plan[] } }>(
    //  url,
    // );
    // return response.data;
  }
}
