import { Plan } from "../../../core/domain/plan";

export type PlanCreationData = Pick<
  Plan,
  "owner" | "title" | "location" | "time" | "category" | "privacy" | "description" | "capacity"
>;
