import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Id } from "../../../src/core/domain/types/id";
import { withEnvironment } from "../extensions/with-environment";
import { PlanModel, PlanSnapshot } from "../plan/plan";

export const PlanStoreModel = types
  .model("PlanStore")
  .props({
    plans: types.optional(types.array(PlanModel), []),
  })
  .extend(withEnvironment)
  .actions(self => ({
    savePlans: (planSnapshots: PlanSnapshot[]) => {
      self.plans.replace(planSnapshots as any);
    },
  }))
  .actions(self => ({
    getPlan: (planId: Id) => {
      const foundPlans = self.plans.filter(plan => plan.id === planId);

      return foundPlans[0];
    },
  }));

type PlanStoreType = Instance<typeof PlanStoreModel>;
export interface PlanStore extends PlanStoreType {}
type PlanStoreSnapshotType = SnapshotOut<typeof PlanStoreModel>;
export interface PlanStoreSnapshot extends PlanStoreSnapshotType {}
export const createPlanStoreDefaultModel = () => types.optional(PlanStoreModel, {});
