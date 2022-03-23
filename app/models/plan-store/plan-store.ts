import { Instance, SnapshotOut, types } from "mobx-state-tree";
// import { containerDI } from "../../../src/core/infrastructure/dependency-injection/container";
// import { PlanFinder } from "../../../src/features/find-plan/application/plan-finder";
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
  }));
  // // TODO: delete this method, we do not need it here
  // .actions(self => ({
  //   getPlans: async () => {
  //     const planFinder = containerDI.resolve(PlanFinder);
  //     const { plans } = await planFinder.findAll();
  //     if (plans.length > 0) {
  //       self.savePlans(plans);
  //     } else {
  //       __DEV__ && console.tron.log(plans);
  //     }
  //   },
  // }
  // )
  // );

type PlanStoreType = Instance<typeof PlanStoreModel>;
export interface PlanStore extends PlanStoreType {}
type PlanStoreSnapshotType = SnapshotOut<typeof PlanStoreModel>;
export interface PlanStoreSnapshot extends PlanStoreSnapshotType {}
export const createPlanStoreDefaultModel = () => types.optional(PlanStoreModel, {});
