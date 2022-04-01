import { Email } from "./types/email";
import { Entity } from "./types/entity";
import { Password } from "./types/password";
import { PhoneNumber } from "./types/phone-number";

// interface UserName {
//   firstName: string;
//   lastName: string;
// }

export interface User extends Entity {
  name: string;
  lastName: string;
  email: Email;
  phoneNumber: PhoneNumber;
  newPassword: Password;
}
