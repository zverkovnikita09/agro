import { FocusEvent, InputHTMLAttributes, forwardRef, useId, useRef, useEffect, ChangeEvent, useState, useImperativeHandle } from 'react'
import cn from 'classnames';
import style from './Input.module.scss'
import { ErrorBlock } from '../ErrorBlock';
import InputMask from 'react-input-mask';
import SearchIcon from '@images/search.svg'

export enum InputTheme {
  PRIMARY = '',
  FILTERS = 'filters_theme'
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: string
  touched?: boolean | undefined
  wrapperClassName?: string
  label?: string
  mask?: string
  maskChar?: string
  withSearchIcon?: boolean;
  searchIconPosition?: "left" | "right";
  inputAutoFocus?: boolean;
  fixLabel?: boolean;
  theme?: InputTheme;
  formatChars?: Record<string, string>
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    wrapperClassName,
    error,
    touched,
    label,
    theme = InputTheme.PRIMARY,
    type,
    mask,
    maskChar = "_",
    withSearchIcon,
    searchIconPosition = "left",
    inputAutoFocus,
    value,
    placeholder,
    fixLabel,
    onFocus,
    onBlur,
    onChange,
    disabled,
    ...otherProps
  } = props

  const [isLabelFixed, setIsLabelFixed] = useState(false);
  const [isFocused, setIsFocused] = useState(false)

  const id = useId();

  const additionalInputClasses = [
    className,
    style[theme],
    { [style.withSearchIcon]: withSearchIcon },
    style[`icon_${searchIconPosition}`],
    { [style.withLabel]: label },
    { [style.disabled]: disabled }
  ]

  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);

  useEffect(() => {
    if (inputAutoFocus) inputRef?.current?.focus();
  }, []);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (typeof value !== "undefined") setIsLabelFixed(!!value);
    if (!!ref) setIsLabelFixed(!!inputRef.current?.value);
    onBlur?.(e)
  }

  useEffect(() => {
    if (value) {
      setIsLabelFixed(true)
      return
    }
    setIsLabelFixed(false)
  }, [value]);

  useEffect(() => {
    if (typeof value === "undefined" && typeof inputRef.current?.value !== "undefined") {
      inputRef.current.value = ""
    }
  }, [value])

  const defaultInput = (additionalProps?: InputHTMLAttributes<HTMLInputElement>) => <input
    id={id}
    type={type}
    value={value}
    className={cn(style.textField, ...additionalInputClasses)}
    ref={inputRef}
    placeholder={!label ? placeholder : undefined}
    onFocus={handleFocus}
    onBlur={handleBlur}
    onChange={onChange}
    disabled={disabled}
    {...additionalProps}
    {...otherProps}
  />

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value.replace(/[^+\d\,]/g, '') as unknown as ChangeEvent<HTMLInputElement>);
  }

  const TextField = () => {
    switch (type) {
      case "tel": return mask ?
        <InputMask
          mask={mask}
          id={id}
          type={type}
          className={cn(style.textField, ...additionalInputClasses)}
          inputRef={inputRef}
          maskChar={maskChar}
          value={!disabled ? value : undefined}
          placeholder={!label ? placeholder : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          disabled={disabled}
          autoComplete='off'
          {...otherProps}
        /> :
        defaultInput()
      case "number": return defaultInput({ type: "tel", onChange: onNumberChange, autoComplete: "off" })
      default: return defaultInput();
    }
  }

  return (
    <div className={cn(style.input, wrapperClassName, { [style.error]: error }, { [style.focused]: isFocused })}>
      <div className={style.inputContainer}>
        {withSearchIcon && <SearchIcon className={cn(style.searchIcon, style[`icon_${searchIconPosition}`])} width={18} height={18} />}
        {label &&
          <label
            htmlFor={id}
            className={cn(
              style.label,
              { [style.fixed]: fixLabel || isLabelFixed },
              { [style.disabled]: disabled }
            )}
          >
            {label}
          </label>
        }
        {TextField()}
      </div>
      {error && <ErrorBlock>{error}</ErrorBlock>}
    </div>
  )
})

Input.displayName = "Input"