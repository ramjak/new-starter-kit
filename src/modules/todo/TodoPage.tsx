import {Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import React from 'react';
import ITodo from "../../domains/todo";
import BasePage from "../../components/BasePage";

interface ITodoPage {
}

const todos: ITodo[] = [
  { task: 'Auth', isDone: false },
  { task: 'UI', isDone: true },
  { task: 'Routing', isDone: false },
  { task: 'IoC Container', isDone: false },
  { task: 'Request service', isDone: false },
  { task: 'Sample domain', isDone: true },
  { task: 'Code styling config', isDone: true },
  { task: 'Sample testing', isDone: false },
]

function TodoPage(props: ITodoPage) {
  return (
    <BasePage>
      <Typography gutterBottom={true} variant="h5" component="h2">
        Todo List:
      </Typography>
      <List component="nav">
        {todos.map(todo => (
          <ListItem key={todo.task} role={undefined} dense={true}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                defaultChecked={todo.isDone}
                tabIndex={-1}
                disableRipple={true}
              />
            </ListItemIcon>
            <ListItemText primary={todo.task} />
          </ListItem>
        ))}
      </List>
    </BasePage>
  );
}

export default TodoPage;
