import { container } from "tsyringe";
import { UserAuthenticatorHttpRepository } from "../../../features/authenticate-user/infrastructure/user-login-http-repository";
import { PlanCreatorHttpRepository } from "../../../features/create-plan/infrastructure/plan-creator-http-repository";
import { UserCreatorHttpRepository } from "../../../features/create-user/infrastructure/user-creator-http-repository";
import { PlanListHttpRepository } from "../../../features/find-plan/infrastructure/plan-list-http-repository";
import { JoinPlanRequestHttpRepository } from "../../../features/request-join-plan/infrastructure/join-plan-requestor-http-repository";
import {
  JOIN_PLAN_REQUESTER_REPOSITORY,
  PLAN_CREATOR_REPOSITORY,
  PLAN_LIST_REPOSITORY,
  USER_AUTHENTICATOR_REPOSITORY,
  USER_CREATOR_REPOSITORY,
} from "./injection-tokens";

const containerDI = container;

// if (process.env.NODE_ENV === "test") {
//   containerDI.register(PLAN_LIST_REPOSITORY, PlanListMockRepository);
//   containerDI.register(PLAN_CREATOR_REPOSITORY, PlanCreatorMockRepository);
// } else {
containerDI.register(PLAN_LIST_REPOSITORY, PlanListHttpRepository);
containerDI.register(PLAN_CREATOR_REPOSITORY, PlanCreatorHttpRepository);
containerDI.register(JOIN_PLAN_REQUESTER_REPOSITORY, JoinPlanRequestHttpRepository);
containerDI.register(USER_CREATOR_REPOSITORY, UserCreatorHttpRepository);
containerDI.register(USER_AUTHENTICATOR_REPOSITORY, UserAuthenticatorHttpRepository);

// }\

export { containerDI };
