import cn from 'classnames';
import styles from './BackButton.module.scss'
import { PropsWithChildren } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouterPaths } from "@src/app/router";
import { Button } from '../Button';

interface BackButtonProps {
  className?: string;
  defaultRoute?: RouterPaths;
}

export const BackButton = (props: PropsWithChildren<BackButtonProps>) => {
  const { className, defaultRoute, children } = props;
  const navigate = useNavigate()

  const handleClick = () => defaultRoute ? navigate(defaultRoute) : navigate(-1)

  return (
    <Button
      className={cn(styles.backButton, className)}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}
