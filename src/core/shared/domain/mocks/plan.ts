import { Plan, Privacy, Category } from "../plan";

export const BoringPlan: Plan = {
  id: "1644262344135",
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
  id: "1644262549774",
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
  id: "1644262555022",
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
  id: "1644262560702",
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
