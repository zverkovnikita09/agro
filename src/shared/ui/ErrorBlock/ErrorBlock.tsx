import style from './ErrorBlock.module.scss'
import cn from "classnames";

interface ErrorBlockProps {
  children: string
  className?: string
}

export const ErrorBlock = ({ children, className }: ErrorBlockProps) => {
  return (
    <p className={cn(style.errorBlock, className)}>{children}</p>
  )
}