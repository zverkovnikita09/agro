import cn from 'classnames';
import styles from './Text.module.scss'
import { ReactNode } from "react";

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  ML = 'size_ml',
  L = 'size_l',
  XL = 'size_xl',
}

export enum TextWeight {
  THIN = 'thin',
  REGULAR = 'regular',
  MEDIUM = 'medium',
  SEMI_BOLD = 'semi_bold',
  BOLD = 'bold',

}

export enum TextColor {
  PRIMARY = "",
  MAIN_COLOR = 'main_color',
  GREY = 'grey',
  /*   SPECIAL_GREEN = 'spesial_green',
    ERROR = 'error', */
}

interface TextProps {
  className?: string;
  children?: ReactNode
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  as?: "span" | "p"
}

export const Text = (props: TextProps) => {
  const { className, children, size = TextSize.M, weight = TextWeight.REGULAR, color = TextColor.PRIMARY, as = "span" } = props;
  const additionalClasses = [
    className,
    styles[size],
    styles[weight],
    styles[color],
  ]

  const Component = as;

  return <Component className={cn(styles.text, additionalClasses)}>{children}</Component>

}
