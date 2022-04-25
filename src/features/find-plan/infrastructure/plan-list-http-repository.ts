import axios from "axios";
import { Repository } from "../../../../app/base/respository";
import { Plan, Category } from "../../../core/domain/plan";
import { Id } from "../../../core/domain/types/id";
import { CustomLocation } from "../../../core/domain/types/location";
import { User } from "../../../core/domain/user";
import type { PlanListRepository } from "../domain/plan-list-repository";

export class PlanListHttpRepository extends Repository implements PlanListRepository {
  private readonly repositorRoot = "http://localhost:8080/plans";

  async findAll() {
    try {
      const response = await axios.get<undefined, { data: { success: boolean; data: Plan[] } }>(
        `${this.repositorRoot}`,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

  async findByCategory(category: Category) {
    try {
      const response = await axios.get<undefined, { data: { success: boolean; data: Plan[] } }>(
        `${this.repositorRoot}/${category}`,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

  async findByTime(time: number) {
    try {
      const response = await axios.get<undefined, { data: { success: boolean; data: Plan[] } }>(
        `${this.repositorRoot}/time/${time}`,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

  async findByLocation(location: CustomLocation) {
    try {
      const response = await axios.get<undefined, { data: { success: boolean; data: Plan[] } }>(
        `${this.repositorRoot}/location/${location}`,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

  async findByOwner(owner: User) {
    // TODO: implement api in backend
    // const url: string = `${this.repositorRoot}/owner/${owner.id}`
    try {
      const { data } = await this.findAll();

      const ownersPlan = data.filter(plan => plan.ownerId === owner.id);

      return { success: true, data: ownersPlan };
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

  async get(planId: Id) {
    try {
      const response = await axios.get<undefined, { data: { success: boolean; data: Plan } }>(
        `${this.repositorRoot}/${planId}`,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error)
    }
    return Promise.resolve({ success: false, data: null })
  }

}
