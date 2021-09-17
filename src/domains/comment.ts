import { Asserts, object, string } from "yup";

export const commentSchema = object({
  name: string().max(255).required(),
  email: string().email().required(),
  body: string().required(),
}).required();

export interface IRawComment extends Asserts<typeof commentSchema> {}

export default interface IComment extends IRawComment {
  postId: number;
  id: number;
}
