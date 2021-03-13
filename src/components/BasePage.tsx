import React from 'react';
import styles from "./BasePage.module.scss";
import logo from "../logo.svg";
import {Card} from "@material-ui/core";

interface IBasePage {
  children: React.ReactNode
}

function BasePage(props: IBasePage) {
  const { children } = props;
  return (
    <div className={styles.App}>
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
