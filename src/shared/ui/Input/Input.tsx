import { InputHTMLAttributes, forwardRef, useId } from 'react'
import cn from 'classnames';
import style from './Input.module.scss'
import { ErrorBlock } from '../ErrorBlock';
import InputMask from 'react-input-mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: string
  touched?: boolean | undefined
  wrapperClassName?: string
  label?: string
  mask?: string
  maskChar?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    wrapperClassName,
    error,
    touched,
    label,
    type,
    value,
    mask,
    maskChar = "_",
    ...otherProps
  } = props

  const id = useId();

  const TextField = () => {
    switch (type) {
      case "tel": return mask ?
        <InputMask 
        mask={mask} 
        id={id} 
        type={type} 
        className={cn(style.textField, className)} 
        inputRef={ref} 
        maskChar={maskChar}
        {...otherProps} 
        /> :
        <input
          id={id}
          type={type}
          className={cn(style.textField, className)}
          ref={ref}
          {...otherProps}
        />
      default: return (
        <input
          id={id}
          type={type}
          className={cn(style.textField, className)}
          ref={ref}
          {...otherProps}
        />
      )
    }
  }

  return (
    <div className={cn(style.input, wrapperClassName, { [style.error]: error })}>
      {label && <label htmlFor={id} className={style.label}>{label}</label>}
      {TextField()}
      {error && <ErrorBlock>{error}</ErrorBlock>}
    </div>
  )
})

Input.displayName = "Input"