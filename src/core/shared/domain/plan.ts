import { Id } from "../../types/id";
import { CustomLocation } from "../../types/location";
import { Entity } from "../../types/entity";
import { Timestamp } from "../../types/timestamp";
import { User } from "./user";

export enum Privacy {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum Category {
  WALK = "walk",
  RUN = "run",
}

export interface Plan extends Entity {
  owner: User;
  title: string;
  location: CustomLocation;
  time: Timestamp;
  privacy: Privacy;
  category: Category;
  atendees: User[];
  chat: Id;
}
