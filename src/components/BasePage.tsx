import React from 'react';
import {AppBar, Card, Button, Toolbar, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./BasePage.module.scss";
import logo from "../logo.svg";

export interface ILink {
  text: string,
  link: string
}

interface IBasePage {
  children: React.ReactNode,
  topNavLinks: ILink[]
}

function BasePage(props: IBasePage) {
  const { children, topNavLinks } = props;
  return (
    <div className={styles.App}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.appTitle}>
            Sample App
          </Typography>
          {topNavLinks.map(nav => (
            <Button key={nav.link} component={Link} to={nav.link}>
              {nav.text}
            </Button>
          ))}
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
