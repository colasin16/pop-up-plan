import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { PlanStoreModel } from "../plan-store/plan-store";
import { User, UserModel } from "../user/user";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  // Store for current authenticated user ???
  userStore: types.maybe(UserModel),
  
  // Store for current user owned plans ???
  userPlansStore: types.optional(PlanStoreModel, {} as any),

  // Store for listing all available plans for user which this user can join them
  searchPlansStore: types.optional(PlanStoreModel, {} as any),

  // TODO:  Do we need a store for all attending plans??
}).actions(self => ({
  // TODO: why this action is here?  Can we move it to 'UserModel' like what has been
  // done in 'PlanStoreModel'?
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
