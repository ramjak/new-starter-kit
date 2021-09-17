import { Asserts, object, string } from "yup";

export const postSchema = object({
  title: string().max(255).required(),
  body: string().required(),
});

export interface IRawPost extends Asserts<typeof postSchema> {}

export default interface IPost extends IRawPost {
  userId: number;
  id: number;
}
