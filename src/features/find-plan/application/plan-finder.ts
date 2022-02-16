import { inject, injectable } from "tsyringe";
import { PLAN_LIST_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import { Category } from "../../../core/domain/plan";
import { CustomLocation } from "../../../core/domain/types/location";
import { Timestamp } from "../../../core/domain/types/timestamp";
import type { PlanListRepository } from "../domain/plan-list-repository";

@injectable()
export class PlanFinder {
  constructor(
    @inject(PLAN_LIST_REPOSITORY) private readonly planListRepository: PlanListRepository,
  ) {}

  public async findAll() {
    return await this.planListRepository.findAll();
  }

  public async findByCategory(category: Category) {
    return await this.planListRepository.findByCategory(category);
  }

  public async findByLocation(location: CustomLocation) {
    return await this.planListRepository.findByLocation(location);
  }

  public async findByTime(time: Timestamp) {
    return await this.planListRepository.findByTime(time);
  }
}
