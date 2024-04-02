import { FocusEvent, InputHTMLAttributes, forwardRef, useId, useRef } from 'react'
import cn from 'classnames';
import style from './Input.module.scss'
import { ErrorBlock } from '../ErrorBlock';
import InputMask from 'react-input-mask';
import SearchIcon from '@images/search.svg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: string
  touched?: boolean | undefined
  wrapperClassName?: string
  label?: string
  mask?: string
  maskChar?: string
  withSearchIcon?: boolean;
  searchIconPosition?: "left" | "right"
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
    withSearchIcon,
    searchIconPosition = "left",
    ...otherProps
  } = props

  const id = useId();

  const additionalInputClasses = [
    className,
    { [style.withSearchIcon]: withSearchIcon },
    style[`icon_${searchIconPosition}`]
  ]

  const inputRef = useRef<HTMLInputElement>(null);

  const TextField = () => {
    switch (type) {
      case "tel": return mask ?
        <InputMask
          mask={mask}
          id={id}
          type={type}
          className={cn(style.textField, ...additionalInputClasses)}
          inputRef={ref ?? inputRef}
          maskChar={maskChar}
          {...otherProps}
        /> :
        <input
          id={id}
          type={type}
          className={cn(style.textField, ...additionalInputClasses)}
          ref={ref ?? inputRef}
          {...otherProps}
        />
      default: return (
        <input
          id={id}
          type={type}
          className={cn(style.textField, ...additionalInputClasses)}
          ref={ref ?? inputRef}
          {...otherProps}
        />
      )
    }
  }

  return (
    <div className={cn(style.input, wrapperClassName, { [style.error]: error })}>
      {/*  {label && <label htmlFor={id} className={style.label}>{label}</label>} */}
      {withSearchIcon && <SearchIcon className={cn(style.searchIcon, style[`icon_${searchIconPosition}`])} width={18} height={18} />}
      {TextField()}
      {error && <ErrorBlock>{error}</ErrorBlock>}
    </div>
  )
})

Input.displayName = "Input"