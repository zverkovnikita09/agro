import cn from 'classnames';
import styles from './Text.module.scss'
import {ReactNode} from "react";

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}

export enum TextWeight {
  THIN = 'thin',
  REGULAR = 'regular',
  MEDIUM = 'medium',
  SEMI_BOLD = 'semi_bold',
  BOLD = 'bold',

}

export enum TextColor {
  MAIN_COLOR = 'main_color',
  GREY = 'grey'
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
  const {className, children, size = TextSize.M, weight = TextWeight.REGULAR, color = TextColor.MAIN_COLOR, as = "span"} = props;
  const additionalClasses = [
    className,
    styles[size],
    styles[weight],
    styles[color],
  ]

  const Component = as;

  return<Component className={cn(styles.text, additionalClasses)}>{children}</Component>

}
