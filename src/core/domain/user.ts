import { Email } from "./types/email";
import { Entity } from "./types/entity";
import { Password } from "./types/password";
import { PhoneNumber } from "./types/phone-number";

interface FullName {
  firstName: string;
  lastName: string;
}

export interface User extends Entity {
  name: FullName;
  email: Email;
  phoneNumber: PhoneNumber;
  password: Password;
  image: string;
}
