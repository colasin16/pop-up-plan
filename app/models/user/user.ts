import { Instance, SnapshotOut, types } from "mobx-state-tree";
// import { UserNameModel } from "./user-name";

export const UserModel = types.model("User").props({
  id: types.identifier,
<<<<<<< HEAD
  name: UserNameModel,
  image: types.maybe(types.string),
=======
  // name: UserNameModel,
  name: types.string,
  lastName: types.string,
  email: types.string,
  phoneNumber: types.string,
>>>>>>> d03cfe4f8ce972a0fec19167eb07793ef289aa79
});

type UserType = Instance<typeof UserModel>;
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>;
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {});
