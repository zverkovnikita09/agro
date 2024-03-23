import cn from 'classnames'
import style from './Title.module.scss'
import { ReactNode, RefObject } from 'react'

export enum TitleSize {
  APPLICATION_TITLE = 'application_title',
  S = 'size_s',
  M = 'size_m',
  L = 'size_l'
}

interface TitleProps {
  size?: TitleSize
  className?: string
  children?: ReactNode
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  titleRef?: RefObject<HTMLHeadingElement>
}

export const Title = ({ children, className, size = TitleSize.M, as = "h1", titleRef }: TitleProps) => {
  const additionalClasses = [
    className,
    style[size],
  ]

  const Component = as;

  return <Component className={cn(style.title, additionalClasses)} ref={titleRef}>{children}</Component>
}