import { Asserts, object, string } from 'yup';

export const postSchema = object({
  title: string().max(255).required(),
  body: string().required(),
});

export default interface IPost extends Asserts<typeof postSchema> {
  userId: number;
  id: number;
}
