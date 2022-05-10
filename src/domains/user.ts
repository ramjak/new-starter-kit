import { Asserts, object, string } from "yup";

export const userSchema = object({
  name: string().max(100).required(),
  rocket: string().max(100).required(),
  twitter: string().max(15).required(),
});

export interface IRawUser extends Asserts<typeof userSchema> {}

export default interface IUser extends IRawUser {
  id: string;
  timestamp: string;
}
