import { Plan } from "../../../core/domain/plan";

export class PlanList {
  constructor(private readonly plans: Plan[]) {}
}
