import React from 'react';
import styles from "./BasePage.module.scss";
import logo from "../logo.svg";
import {AppBar, Button, Card, Toolbar, Typography} from "@material-ui/core";

interface IBasePage {
  children: React.ReactNode
}

function BasePage(props: IBasePage) {
  const { children } = props;
  return (
    <div className={styles.App}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.appTitle}>
            Sample App
          </Typography>
          <Button color="inherit">Todo</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <Card className={styles.WrapperCard}>
          {children}
        </Card>
      </header>
    </div>
  );
}

export default BasePage;
