import { Category } from '../../../core/shared/domain/plan';
import { CustomLocation } from '../../../core/types/location';
import { Timestamp } from '../../../core/types/timestamp';
import { PlanListRepository } from '../domain/plan-list-repository';

export class PlanFinder {
  constructor(private readonly planListRepository: PlanListRepository) {}

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
