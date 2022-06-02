import { Plan } from "../../../core/domain/plan";

export class CheckRequests {
  constructor(private readonly plans: Plan[]) {}
}
