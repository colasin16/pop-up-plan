import { Plan, Privacy, Category } from "../plan";

export const BoringPlan: Plan = {
  id: "1644262344135",
  ownerId: "1644055774364",
  title: "A boring walk",
  location: "Barcelona",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  attendeesId: [],
  pendingAttendeesId: [],
  image:
    "https://i.picsum.photos/id/19/200/200.jpg?hmac=U8dBrPCcPP89QG1EanVOKG3qBsZwAvtCLUrfeXdE0FI",
};

export const AmazingPlan: Plan = {
  id: "1644262549774",
  ownerId: "1644055918329",
  title: "An amazing run",
  location: "Barcelona",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  attendeesId: [],
  pendingAttendeesId: [],
  image:
    "https://i.picsum.photos/id/825/200/200.jpg?hmac=Rpa0BK5LjdGtlClC7IBAfyqXkR8ivGiARYDUmgpjZ3w",
};

export const FarAwayWalkPlan: Plan = {
  id: "1644262555022",
  ownerId: "1644055899237",
  title: "Far away walk",
  location: "Calella",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.WALK,
  attendeesId: [],
  pendingAttendeesId: [],
  image:
    "https://i.picsum.photos/id/389/200/200.jpg?hmac=wMpkVNteeBzuxyzbDb9fXZfr-aCfp8scZWMabXtk7qU",
};

export const FarAwayRunPlan: Plan = {
  id: "1644262560702",
  ownerId: "1644055778836",
  title: "Far away run",
  location: "Sitges",
  time: new Date().valueOf(),
  privacy: Privacy.PUBLIC,
  category: Category.RUN,
  attendeesId: [],
  pendingAttendeesId: [],
  image:
    "https://i.picsum.photos/id/954/200/300.jpg?hmac=S-BQE-Zth1hOGOVewt5Jy5gk_r5fwSHC6iNU4oX3B9k",
};
