import { Asserts, object, string } from "yup";

export const adminSchema = object({
  name: string().max(255).required(),
  email: string().max(320).required(),
});

export interface IRawAdmin extends Asserts<typeof adminSchema> {}

export default interface IAdmin extends IRawAdmin {
  id: string;
  lastUpdated: Date;
}
