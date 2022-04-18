import { Entity } from "./types/entity";
import { Id } from "./types/id";
import { CustomLocation } from "./types/location";
import { Timestamp } from "./types/timestamp";

export enum Privacy {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum Category {
  WALK = "walk",
  RUN = "run",
}

export interface Plan extends Entity {
  ownerId: Id;
  title: string;
  description?: string;
  location: CustomLocation; // Location / area, meybe radius?
  capacity?: number;
  time: Timestamp;
  privacy: Privacy;
  category: Category;
  attendeesId: Id[];
  image?: string;
}
