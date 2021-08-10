import { Asserts, object, string } from 'yup';

export const commentSchema = object({
  name: string().max(255).required(),
  email: string().email().required(),
  body: string().required(),
}).required();

export default interface IComment extends Asserts<typeof commentSchema> {
  postId: number;
  id: number;
}
