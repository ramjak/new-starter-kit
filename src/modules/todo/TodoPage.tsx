import {Card, Checkbox, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import React from 'react';
import logo from "../../logo.svg";
import styles from './TodoPage.module.scss';
import ITodo from "../../domains/todo";

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
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <Card className={styles.TodoCard}>
          <Typography gutterBottom={true} variant="h5" component="h2">
            Todo List:
          </Typography>
          <List component="nav" aria-label="secondary mailbox folders">
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
        </Card>
      </header>
    </div>
  );
}

export default TodoPage;
