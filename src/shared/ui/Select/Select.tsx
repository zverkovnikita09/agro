import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import ArrowDown from "@images/chevron-down.svg";
import { Button } from "@shared/ui/Button";
/* import { IoClose } from "react-icons/io5"; */
import cn from 'classnames'
import { ErrorBlock } from "../ErrorBlock";
import style from './Select.module.scss'
import { Text, TextSize } from "../Text";
import { Input } from "../Input";
import { ClickAwayListener, Popper } from "@mui/material";

interface OptionType {
  name: string
  value: unknown
}

interface CommonSelectProps {
  options: (unknown | OptionType)[]
  placeholder?: string
  error?: string
  label?: string
  className?: string
  fullWidth?: boolean
  noArrow?: boolean
  togglerClassName?: string;
  withInputSearch?: boolean;
  onSearchInput?: (value: string) => void;
  minLengthForOptions?: number;
  hideOptions?: boolean;
}

interface MultipleSelectProps<T = unknown> {
  multiple: true
  value: T[]
  setValue: (value: T[]) => void
}

interface SingleSelectProps<T = unknown> {
  multiple?: false
  value: T
  setValue: (value: T) => void
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
    withInputSearch,
    togglerClassName,
    onSearchInput,
    minLengthForOptions = 1,
    hideOptions,
  } = props

  const [, setIsFocused] = useState(false);
  const [availableOptions, setAvailableOptions] = useState(options);
  const elementRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchorEl(dropdownAnchorEl ? null : event.currentTarget);
  };

  const handleClose = () => setDropdownAnchorEl(null);

  const isDropdownOpen = Boolean(dropdownAnchorEl);

  const addValue = useCallback((selectValue: string) => () => {
    if (multiple) {
      setValue([...(value ?? []), selectValue]);
      handleClose()
      return;
    }

    setValue(selectValue);
  }, [value])

  const deleteValue = useCallback((selectValue: string) => () => {
    if (multiple) {
      setValue(value?.filter(item => item !== selectValue) ?? [])
    }
  }, [value])

  const isOptionTypeArray = (options: (unknown | OptionType)[]): options is OptionType[] => {
    return !!(options?.length && (options[0] as OptionType)?.name)
  }

  const valueToShow = (value: unknown) => {
    if (isOptionTypeArray(options)) {
      return (options.find(item => (item as OptionType).value === value) as OptionType)?.name || ''
    }

    if (!options.length) {
      return value
    }

    return value
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearchInput?.(e.target.value);
  }

  useEffect(() => {
    setInputValue(multiple ? value?.join("") : String(value))
  }, [isDropdownOpen])

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={cn(style.select, className,
        { [style.fullWidth]: fullWidth },
        { [style.noArrow]: noArrow }
      )}>
        {withInputSearch && isDropdownOpen &&
          <Input
            className={cn(style.input, { [style.noArrow]: noArrow })}
            wrapperClassName={style.inputWrapper}
            inputAutoFocus
            value={inputValue}
            onChange={handleInputChange}
            autoComplete={"off"}
            label={label}
            fixLabel={typeof value === "string" ? !!value : !!value?.length}
            onFocus={() => {
              if (typeof value === 'string' && value) onSearchInput?.(value);
            }}
          />
        }
        <div
          className={cn(style.toggler,
            togglerClassName,
            { [style.withInput]: withInputSearch },
            { [style.withLabel]: label },
            { [style.hideValue]: withInputSearch && isDropdownOpen },
            { [style.error]: error }
          )}
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={elementRef}
          onClick={handleClick}
        >
          {label &&
            <label className={cn(style.label,
              { [style.fixed]: (multiple ? !!value?.length : !!String(value)) },
              { [style.focused]: isDropdownOpen },
              { [style.withInput]: withInputSearch }
            )}
            >
              {label}
            </label>
          }
          {!noArrow && <ArrowDown
            className={cn(style.arrowDown, { [style.rotated]: isDropdownOpen })}
          />}
          {!multiple && <Text className={cn(style.togglerText)} size={TextSize.L}>{(valueToShow(value ?? '') || placeholder)}</Text>}
          {multiple && (value?.length ?
            (value.map((item) => (
              <div key={item} className={style.valueItem} onClick={e => e.stopPropagation()}>
                {valueToShow(item)}
                <Button onClick={deleteValue(item)}>{/* <IoClose /> */}</Button>
              </div>
            )))
            : placeholder)}
          <Popper
            open={isDropdownOpen && !hideOptions && (withInputSearch ? inputValue.length >= minLengthForOptions : true)}
            anchorEl={dropdownAnchorEl}
            className={style.dropdown}
            style={{ width: dropdownAnchorEl?.clientWidth }}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          >
            {(multiple ? availableOptions : options)?.length
              ? (multiple ? availableOptions : options).map((option) => {
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
              : <p className={style.text}>Нет доступных элементов</p>
            }
          </Popper>
        </div>
        {error && <ErrorBlock>{error}</ErrorBlock>}
      </div>
    </ClickAwayListener>
  )
}