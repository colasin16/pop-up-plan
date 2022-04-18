import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Category, Privacy } from "../../../src/core/domain/plan";

export const PlanModel = types.model("Plan").props({
  id: types.identifier,
  title: types.string,
  category: types.enumeration(Object.values(Category)),
  privacy: types.enumeration(Object.values(Privacy)),
  // owner: UserModel,
  // TODO: Check whether this type is ok
  ownerId: types.string,
  location: types.string,
  time: types.number,
  // attendees: types.array(UserModel),
  // TODO: Check whether this type is ok
  attendeesId: types.array(types.string),
});

type PlanType = Instance<typeof PlanModel>;
export interface Plan extends PlanType {}
type PlanSnapshotType = SnapshotOut<typeof PlanModel>;
export interface PlanSnapshot extends PlanSnapshotType {}
export const createPlanDefaultModel = () => types.optional(PlanModel, {});
