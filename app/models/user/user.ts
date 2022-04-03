import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { UserFullNameModel } from "./user-name";

export const UserModel = types.model("User").props({
  id: types.identifier,
  name: UserFullNameModel,
  email: types.string,
  phoneNumber: types.string,
  image:
    "https://avatars2.githubusercontent.com/u/3902527?s=200&u=a0d16b13ed719f35d95ca0f4440f5d07c32c349a&v=4",
});

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {});
