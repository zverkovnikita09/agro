import cn from 'classnames';
import styles from './BackButton.module.scss'
import {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {RouterPaths} from "@src/app/router";

interface BackButtonProps {
  className?: string;
  defaultRoute: RouterPaths;
}

export const BackButton = (props: PropsWithChildren<BackButtonProps>) => {
  const { className, defaultRoute, children } = props;

  return (
    <Link
      className={cn(styles.backButton, className)}
      to={defaultRoute}
    >
      {children}
    </Link>
  )
}
