import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { CharacterStoreModel } from "../character-store/character-store";
import { PlanStoreModel } from "../plan-store/plan-store";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  userPlansStore: types.optional(PlanStoreModel, {} as any),
  searchPlansStore: types.optional(PlanStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
