import { Id } from "../../types/id";
import { CustomLocation } from "../../types/location";
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

export interface Plan {
  owner: User;
  title: string;
  location: CustomLocation;
  time: Timestamp;
  privacy: Privacy;
  category: Category;
  atendees: User[];
  chat: Id;
}

export const BoringPlan: Plan = {
  owner: {
    id: "1644055774364",
    name: "Tom",
  },
  title: "A boring walk",
  location: { address: "Barcelona" },
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  atendees: [],
  chat: "1644055787449",
};

export const AmazingPlan: Plan = {
  owner: {
    id: "1644055918329",
    name: "Robert",
  },
  title: "An amazing run",
  location: { address: "Barcelona" },
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  atendees: [],
  chat: "1644055924452",
};

export const FarAwayWalkPlan: Plan = {
  owner: {
    id: "1644055899237",
    name: "Jan",
  },
  title: "Far away walk",
  location: { address: "Calella" },
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  atendees: [],
  chat: "1644055906972",
};

export const FarAwayRunPlan: Plan = {
  owner: {
    id: "1644055778836",
    name: "Martin",
  },
  title: "Far away run",
  location: { address: "Sitges" },
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  atendees: [],
  chat: "1644055782685",
};
