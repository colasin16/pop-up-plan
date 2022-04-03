import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const UserFullNameModel = types.model("UserFullName").props({
  firstName: types.string,
  lastName: types.string,
});

type UserNameType = Instance<typeof UserFullNameModel>;
export interface UserName extends UserNameType {}
type UserNameSnapshotType = SnapshotOut<typeof UserFullNameModel>;
export interface UserNameSnapshot extends UserNameSnapshotType {}
export const createUserNameDefaultModel = () => types.optional(UserFullNameModel, {});
