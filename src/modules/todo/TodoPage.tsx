import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React from 'react';
import ITodo from '../../domains/todo';

interface ITodoPage {}

const todos: ITodo[] = [
  { task: 'Auth', isDone: true },
  { task: 'UI', isDone: true },
  { task: 'Routing', isDone: true },
  { task: 'IoC Container', isDone: true },
  { task: 'Request service', isDone: true },
  { task: 'Request sample', isDone: true },
  { task: 'Domain hook sample', isDone: true },
  { task: 'Sample domain', isDone: true },
  { task: 'Code styling config', isDone: true },
  { task: 'Sample testing', isDone: false },
];

function TodoPage(props: ITodoPage) {
  return (
    <>
      <Typography gutterBottom={true} variant="h5" component="h2">
        Todo List:
      </Typography>
      <List component="nav">
        {todos.map((todo) => (
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
    </>
  );
}

export default TodoPage;
