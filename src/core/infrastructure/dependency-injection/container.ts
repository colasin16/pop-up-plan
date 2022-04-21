import { container } from "tsyringe";
import {
  PLAN_CREATOR_REPOSITORY,
  PLAN_LIST_REPOSITORY,
  USER_AUTHENTICATOR_REPOSITORY,
  USER_CREATOR_REPOSITORY,
} from "./injection-tokens";
import { PlanListHttpRepository } from "../../../features/find-plan/infrastructure/plan-list-http-repository";
import { PlanCreatorHttpRepository } from "../../../features/create-plan/infrastructure/plan-creator-http-repository";
import { UserCreatorHttpRepository } from "../../../features/create-user/infrastructure/user-creator-http-repository";
import { UserAuthenticatorHttpRepository } from "../../../features/authenticate-user/infrastructure/user-login-http-repository";

const containerDI = container;

// if (process.env.NODE_ENV === "test") {
//   containerDI.register(PLAN_LIST_REPOSITORY, PlanListMockRepository);
//   containerDI.register(PLAN_CREATOR_REPOSITORY, PlanCreatorMockRepository);
// } else {
containerDI.register(PLAN_LIST_REPOSITORY, PlanListHttpRepository);
containerDI.register(PLAN_CREATOR_REPOSITORY, PlanCreatorHttpRepository);
containerDI.register(USER_CREATOR_REPOSITORY, UserCreatorHttpRepository);
containerDI.register(USER_AUTHENTICATOR_REPOSITORY, UserAuthenticatorHttpRepository);

// }\

export { containerDI };
