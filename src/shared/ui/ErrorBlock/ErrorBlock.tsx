import style from './ErrorBlock.module.scss'

interface ErrorBlockProps {
  children: string
}

export const ErrorBlock = ({ children }: ErrorBlockProps) => {
  return (
    <p className={style.errorBlock}>{children}</p>
  )
}