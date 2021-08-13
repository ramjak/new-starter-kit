import { Asserts, boolean, object, string } from "yup";

const todoSchema = object({
  task: string().required(),
  isDone: boolean().required(),
});

export default interface ITodo extends Asserts<typeof todoSchema> {}

export function toggleTodo(todo: ITodo): ITodo {
  return { ...todo, isDone: !todo.isDone };
}
