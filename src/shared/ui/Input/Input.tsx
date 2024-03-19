import { InputHTMLAttributes, forwardRef, useId } from 'react'
import cn from 'classnames';
import style from './Input.module.scss'
import { FieldError } from 'react-hook-form';
import { ErrorBlock } from '../ErrorBlock';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: FieldError
  touched?: boolean | undefined
  wrapperClassName?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    wrapperClassName,
    error,
    touched,
    label,
    ...otherProps
  } = props

  const id = useId();

  return (
    <div className={cn(style.input, wrapperClassName)} data-status={error ? 'error' : touched ? 'success' : ''}>
      {label && <label htmlFor={id} className={style.label}>{label}</label>}
      <input
        id={id}
        className={cn(style.textField, className)}
        ref={ref}
        {...otherProps}
      />
      {error?.message && <ErrorBlock>{error?.message}</ErrorBlock>}
    </div>
  )
})

Input.displayName = "Input"