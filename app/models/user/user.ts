import { Instance, SnapshotOut, types } from "mobx-state-tree";
// import { UserNameModel } from "./user-name";

export const UserModel = types.model("User").props({
  id: types.identifier,
  // name: UserNameModel,
  name: types.string,
  lastName: types.string,
  email: types.string,
  phoneNumber: types.string,
});

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {});
