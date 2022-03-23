import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { CharacterStoreModel } from "../character-store/character-store";
import { PlanStoreModel } from "../plan-store/plan-store";
import { User, UserModel } from "../user/user";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  // TODO: remove this store
  characterStore: types.optional(CharacterStoreModel, {} as any),
  userStore: types.maybe(UserModel),
  // TODO: Must we have different Models for `userPlansStore` and `searchPlansStore`?
  // Because I think that getPlans method must have different implementations for 
  // these stores
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
