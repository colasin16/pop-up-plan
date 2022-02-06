import { Plan } from '../../../core/shared/domain/plan';
import { User } from '../../../core/shared/domain/user';
import { PersistedObject } from '../../../core/types/persisted-object';
import { PlanCreationData } from './plan-creation-data';

export interface PlanCreatorRepository {
  create(owner: User, plan: PlanCreationData): Promise<PersistedObject<Plan>>;
}
