export default interface ITodo {
    task: string,
    isDone: boolean
}

export function toggleTodo(todo: ITodo): ITodo {
  return { ...todo, isDone: !todo.isDone };
}
