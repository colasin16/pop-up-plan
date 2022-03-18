import { Plan, Privacy, Category } from "../plan";

export const BoringPlan: Plan = {
  id: "1644262344135",
  owner: {
    id: "1644055774364",
    name: { firstName: "Tom", lastName: "Smith" },
  },
  title: "A boring walk",
  location: "Barcelona",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  attendees: [],
  image: "https://i.picsum.photos/id/19/200/200.jpg?hmac=U8dBrPCcPP89QG1EanVOKG3qBsZwAvtCLUrfeXdE0FI",
};

export const AmazingPlan: Plan = {
  id: "1644262549774",
  owner: {
    id: "1644055918329",
    name: { firstName: "Robert", lastName: "Smith" },
  },
  title: "An amazing run",
  location: "Barcelona",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  attendees: [],
  image: "https://i.picsum.photos/id/825/200/200.jpg?hmac=Rpa0BK5LjdGtlClC7IBAfyqXkR8ivGiARYDUmgpjZ3w",
};

export const FarAwayWalkPlan: Plan = {
  id: "1644262555022",
  owner: {
    id: "1644055899237",
    name: { firstName: "Jan", lastName: "Smith" },
  },
  title: "Far away walk",
  location: "Calella",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  attendees: [],
  image: "https://i.picsum.photos/id/389/200/200.jpg?hmac=wMpkVNteeBzuxyzbDb9fXZfr-aCfp8scZWMabXtk7qU",
};

export const FarAwayRunPlan: Plan = {
  id: "1644262560702",
  owner: {
    id: "1644055778836",
    name: { firstName: "Martin", lastName: "Smith" },
  },
  title: "Far away run",
  location: "Sitges",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  attendees: [],
  image: "https://i.picsum.photos/id/954/200/300.jpg?hmac=S-BQE-Zth1hOGOVewt5Jy5gk_r5fwSHC6iNU4oX3B9k",
};
