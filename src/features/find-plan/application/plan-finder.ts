import { inject, injectable } from "tsyringe";
import { PLAN_LIST_REPOSITORY } from "../../../core/infrastructure/dependency-injection/injection-tokens";
import { Category } from "../../../core/domain/plan";
import { CustomLocation } from "../../../core/domain/types/location";
import { Timestamp } from "../../../core/domain/types/timestamp";
import type { PlanListRepository } from "../domain/plan-list-repository";
import { User } from "../../../core/domain/user";
import { Id } from "../../../core/domain/types/id";

@injectable()
export class PlanFinder {
  constructor(
    @inject(PLAN_LIST_REPOSITORY) private readonly planListRepository: PlanListRepository,
  ) { }

  public async get(planId: Id) {
    return await this.planListRepository.get(planId);
  }

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

  public async findByOwner(owner: User) {
    return await this.planListRepository.findByOwner(owner);
  }

  public async findByAttendee(attendee: User) {
    return await this.planListRepository.findByAttendee(attendee);
  }

}
