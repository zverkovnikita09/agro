import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import ArrowDown from "@images/chevron-down.svg";
/* import { IoClose } from "react-icons/io5"; */
import cn from 'classnames'
import { ErrorBlock } from "../ErrorBlock";
import style from './Select.module.scss'
import { Text, TextSize } from "../Text";
import { Input, InputProps } from "../Input";
import { ClickAwayListener, Popper } from "@mui/material";

interface OptionType {
  name: string
  value: unknown
}

export enum SelectTheme {
  PRIMARY = '',
  FILTERS = 'filters_theme'
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
  theme?: SelectTheme;
  searchInputProps?: InputProps
  noOptionText?: string
  dropdownClassName?: string
  clearOnClose?: boolean
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
    theme = SelectTheme.PRIMARY,
    className,
    fullWidth,
    noArrow,
    withInputSearch,
    togglerClassName,
    onSearchInput,
    minLengthForOptions = 0,
    hideOptions,
    searchInputProps,
    dropdownClassName,
    noOptionText = 'Нет доступных элементов',
    clearOnClose
  } = props


  const [, setIsFocused] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<(unknown | OptionType)[]>([]);
  const elementRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(null);

  const handleTogglerClick = (event: React.MouseEvent<HTMLElement>) => {
    dropdownAnchorEl && clearOnClose && setInputValue("")
    setDropdownAnchorEl(dropdownAnchorEl ? null : event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setDropdownAnchorEl(null)
    clearOnClose && setInputValue("")
  };

  const isDropdownOpen = Boolean(dropdownAnchorEl);

  const addValue = useCallback((selectValue: unknown) => () => {
    if (multiple) {
      setValue([...(value ?? []), selectValue]);
      handleCloseDropdown()
      return;
    }

    setValue(selectValue);
  }, [value])

  useLayoutEffect(() => {
    setAvailableOptions(options)
  }, [options])

  /*  const deleteValue = useCallback((selectValue: string) => () => {
     if (multiple) {
       setValue(value?.filter(item => item !== selectValue) ?? [])
     }
   }, [value]) */

  const isOptionTypeArray = (options: (unknown | OptionType)[]): options is OptionType[] => {
    return !!(options?.length && (options[0] as OptionType)?.name)
  }

  const valueToShow = (value: unknown) => {
    if (typeof value === "undefined") return ""

    if (isOptionTypeArray(options)) {
      return (options.find(item => (item as OptionType).value === value) as OptionType)?.name || ''
    }

    /* if (!options?.length) {
      return value
    } */

    return String(value)
  }

  useEffect(() => {
    if (multiple) {
      const stringOptions = isOptionTypeArray(options) ? options.map(option => option.value) : options;
      const newOptions = stringOptions.filter(option => !(value?.includes(option) ?? true));
      setAvailableOptions(
        isOptionTypeArray(options)
          ? newOptions.map(option => options.find(item => item.value === option))
          : newOptions
      )
    }
  }, [value])

  useEffect(() => {
    if (!onSearchInput) {
      const stringOptions = isOptionTypeArray(options) ? options.map(option => option.value) : options;
      const newOptions = stringOptions.filter(option => String(option).toUpperCase().includes(inputValue.trim().toUpperCase()));

      setAvailableOptions(
        isOptionTypeArray(options)
          ? newOptions.map(option => options.find(item => item.value === option))
          : newOptions
      )
    }
  }, [inputValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof e === "object") {
      setInputValue(e.target.value);
      onSearchInput?.(e.target.value);
      return
    }
    setInputValue(e);
    onSearchInput?.(e);
  }

  useEffect(() => {
    if (!clearOnClose && withInputSearch) {
      setInputValue(typeof value !== 'undefined' ? multiple ? value?.join("") : String(value) : "")
    }
  }, [isDropdownOpen, clearOnClose])

  return (
    <ClickAwayListener onClickAway={handleCloseDropdown}>
      <div className={cn(style.select, className,
        { [style.fullWidth]: fullWidth },
        { [style.noArrow]: noArrow }
      )}>
        {withInputSearch && isDropdownOpen &&
          <Input
            className={cn(style.input, { [style.noArrow]: noArrow }, searchInputProps?.className)}
            wrapperClassName={style.inputWrapper}
            inputAutoFocus
            value={inputValue}
            onChange={handleInputChange}
            autoComplete={"off"}
            label={label}
            fixLabel={Array.isArray(value) ? !!value?.length : (typeof value !== 'undefined' && !!String(value))}
            onFocus={() => {
              //to fix for optiontype
              if (typeof value === 'string' && value) onSearchInput?.(value);
            }}
            {...searchInputProps}
          />
        }
        <div
          className={cn(style.toggler,
            togglerClassName,
            style[theme],
            { [style.withInput]: withInputSearch },
            { [style.withLabel]: label },
            { [style.hideValue]: withInputSearch && isDropdownOpen },
            { [style.error]: error }
          )}
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={elementRef}
          onClick={handleTogglerClick}
        >
          {label &&
            <label className={cn(style.label,
              { [style.fixed]: (Array.isArray(value) ? !!value?.length : (typeof value !== 'undefined' && !!String(value))) },
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
          {!multiple && <Text className={cn(style.togglerText)} size={TextSize.L}>{(valueToShow(value) || placeholder)}</Text>}
          {multiple && (value?.length ?
            <Text className={cn(style.togglerText)} size={TextSize.L}>
              {(value.map((item) => valueToShow(item))).join(", ")}
            </Text>
            : placeholder)}
          <Popper
            open={isDropdownOpen && !hideOptions && (withInputSearch ? inputValue.length >= minLengthForOptions : true)}
            anchorEl={dropdownAnchorEl}
            className={cn(style.dropdown, dropdownClassName)}
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
            {(onSearchInput ? options : availableOptions)?.length
              ? (onSearchInput ? options : availableOptions).map((option, index) => {
                if (isOptionTypeArray(options)) {
                  return (
                    <div
                      key={(option as OptionType).name}
                      className={cn(style.item, { [style.selected]: (option as OptionType).value === value })}
                      onClick={addValue((option as OptionType).value)}
                    >
                      {(option as OptionType).name}
                    </div>
                  )
                }
                return (
                  <div
                    key={index}
                    className={cn(style.item, { [style.selected]: option === value })}
                    onClick={addValue(option)}
                  >
                    {String(option)}
                  </div>
                )
              })
              : <p className={style.text}>{noOptionText}</p>
            }
          </Popper>
        </div>
        {error && <ErrorBlock>{error}</ErrorBlock>}
      </div>
    </ClickAwayListener>
  )
}