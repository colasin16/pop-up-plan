import { container } from "tsyringe";
import { PLAN_LIST_REPOSITORY } from "./injection-tokens";
import { PlanListHttpRepository } from "../../features/find-plan/infrastructure/plan-list-http-repository";

container.register(PLAN_LIST_REPOSITORY, PlanListHttpRepository);

export { container };
