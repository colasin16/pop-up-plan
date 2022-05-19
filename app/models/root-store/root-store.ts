import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { PlanStoreModel } from "../plan-store/plan-store";
import { TokenModel } from "../token/token";
import { User, UserModel } from "../user/user";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  // Store for current authenticated user ???
  userStore: types.maybe(UserModel),

  tokenStore: types.maybe(TokenModel),

  // Store for current user owned plans ???
  userPlansStore: types.optional(PlanStoreModel, {} as any),

  // Store for listing all available plans for user which this user can join them
  searchPlansStore: types.optional(PlanStoreModel, {} as any),

  // TODO:  Do we need a store for all attending plans??
}).actions(self => ({
  // TODO: why this action is here?  Can we move it to 'UserModel' like what has been
  // done in 'PlanStoreModel'?
  setUser: (user: User | undefined) => {
    // we have null here to use it for logout
    self.userStore = user;
  },
  isAuthenticated: () => {
    // we have null here to use it for logout
    return self.userStore !== undefined && self.tokenStore !== undefined
  },
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
