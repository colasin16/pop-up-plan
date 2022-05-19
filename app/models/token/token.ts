import { Instance, SnapshotOut, types } from "mobx-state-tree";

export const TokenModel = types.model("Token").props({
  token: types.string,
});

type UserType = Instance<typeof TokenModel>;
export interface User extends UserType { }
type UserSnapshotType = SnapshotOut<typeof TokenModel>;
export interface UserSnapshot extends UserSnapshotType { }
export const createUserDefaultModel = () => types.optional(TokenModel, {});
