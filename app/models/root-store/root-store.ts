import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { PlanStoreModel } from "../plan-store/plan-store";
import { User, UserModel } from "../user/user";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.maybe(UserModel),
  userPlansStore: types.optional(PlanStoreModel, {} as any),
  searchPlansStore: types.optional(PlanStoreModel, {} as any),
}).actions(self => ({
  setUser: (user: User) => {
    self.userStore = user;
  },
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
