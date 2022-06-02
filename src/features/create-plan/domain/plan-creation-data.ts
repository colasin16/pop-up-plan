import { Plan } from "../../../core/domain/plan";

export type PlanCreationData = Pick<
  Plan,
  "ownerId" | "title" | "location" | "time" | "category" | "privacy" | "description" | "capacity"
>;
