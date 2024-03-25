import { useCallback, useEffect, useRef, useState } from "react"
import ArrowDown from "@images/arrow-down.svg";
import { Button } from "@shared/ui/Button";
/* import { IoClose } from "react-icons/io5"; */
import { Dropdown } from "@shared/ui/Dropdown";
import cn from 'classnames'
import { FieldError } from "react-hook-form";
import { ErrorBlock } from "../ErrorBlock";
import { useToggleDropdown } from "@shared/hook/useToggleDropdown";
import style from './Select.module.scss'
import { Text } from "../Text";

interface OptionType {
  name: string
  value: string
}

interface CommonSelectProps {
  options: (string | OptionType)[]
  placeholder?: string
  error?: FieldError
  label?: string
  className?: string
  fullWidth?: boolean
  noArrow?: boolean
  togglerClassName?: string;
}

interface MultipleSelectProps {
  multiple: true
  value: string[]
  setValue: (value: string[]) => void
}

interface SingleSelectProps {
  multiple?: false
  value: string
  setValue: (value: string) => void
}

type SelectProps = CommonSelectProps & (MultipleSelectProps | SingleSelectProps)

export const Select = (props: SelectProps) => {
  const {
    multiple,
    placeholder,
    value,
    setValue,
    options,
    error,
    label,
    className,
    fullWidth,
    noArrow,
    togglerClassName,
  } = props

  const [, setIsFocused] = useState(false);
  const [isDropdownOpen, toggleDropdown] = useToggleDropdown();
  const [availableOptions, setAvailableOptions] = useState(options);
  const elementRef = useRef<HTMLDivElement>(null)

  const isOptionStringArray = (options: (string | OptionType)[]): options is string[] => {
    return !!(options?.length && typeof options[0] === 'string')
  }

  const addValue = useCallback((selectValue: string) => () => {
    if (multiple) {
      setValue([...(value ?? []), selectValue]);
      toggleDropdown();
      return;
    }

    setValue(selectValue);
  }, [value])

  const deleteValue = useCallback((selectValue: string) => () => {
    if (multiple) {
      setValue(value?.filter(item => item !== selectValue) ?? [])
    }
  }, [value])

  const valueToShow = (value: string) => {
    if (isOptionStringArray(options)) {
      return value
    }

    return (options.find(item => (item as OptionType).value === value) as OptionType)?.name || ''
  }

  useEffect(() => {
    if (multiple) {
      const stringOptions = isOptionStringArray(options) ? options : options.map(option => (option as OptionType).value);
      const newOptions = stringOptions.filter(option => !(value?.includes(option) ?? true));
      setAvailableOptions(
        isOptionStringArray(options)
          ? newOptions
          : newOptions.map(option => options.find(item => (item as OptionType).value === option)!)
      )
    }
  }, [value])

  return (
    <div className={cn(style.select, className,
      { [style.fullWidth]: fullWidth },
      { [style.noArrow]: noArrow }
    )}>
      {label && <p className={style.label}>{label}</p>}
      <div
        className={cn(style.toggler, togglerClassName)}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={elementRef}
        onClick={toggleDropdown}
      >
        {!noArrow && <ArrowDown
          className={cn(style.arrowDown, { [style.rotated]: isDropdownOpen })}
        />}
        {!multiple && <Text className={cn(style.togglerText)}>{(valueToShow(value ?? '') || placeholder)}</Text>}
        {multiple && (value?.length ?
          (value.map((item) => (
            <div key={item} className={style.valueItem} onClick={e => e.stopPropagation()}>
              {valueToShow(item)}
              <Button onClick={deleteValue(item)}>{/* <IoClose /> */}</Button>
            </div>
          )))
          : placeholder)}
        <Dropdown
          isOpen={isDropdownOpen}
          onClose={toggleDropdown}
          targetRef={elementRef}
          horizontalPosition="left"
          width="100%"
          className={style.dropdown}
        >
          {availableOptions?.length
            ? availableOptions.map((option) => {
              if (typeof option === "string") {
                return (
                  <div
                    key={option}
                    className={cn(style.item, { [style.selected]: option === value })}
                    onClick={addValue(option)}
                  >
                    {option}
                  </div>
                )
              }
              return (
                <div
                  key={option.name}
                  className={cn(style.item, { [style.selected]: option.value === value })}
                  onClick={addValue(option.value)}
                >
                  {option.name}
                </div>
              )
            })
            : <p className={cn(style.text, 'greyText')}>Нет доступных элементов</p>
          }
        </Dropdown>
      </div>
      {error?.message && <ErrorBlock>{error?.message}</ErrorBlock>}
    </div>
  )
}