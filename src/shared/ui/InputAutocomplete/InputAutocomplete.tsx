import cn from 'classnames';
import styles from './InputAutocomplete.module.scss'
import { Input, InputProps } from '../Input/Input';
import { useState } from 'react';
import { ClickAwayListener, Popper } from '@mui/material';

interface InputAutocompleteProps extends Omit<InputProps, "onChange"> {
  autocompleteItems: string[];
  value: string;
  setValue: (value: string) => void;
}

export const InputAutocomplete = (props: InputAutocompleteProps) => {
  const {
    className,
    autocompleteItems,
    value = '',
    setValue,
    ...otherProps
  } = props;

  const [dropdownAnchorEl, setDropdownAnchorEl] = useState<null | HTMLElement>(null);

  const handleInputClick = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => setDropdownAnchorEl(null);

  const isDropdownOpen = Boolean(dropdownAnchorEl);

  return (
    <ClickAwayListener onClickAway={handleCloseDropdown}>
      <div className={cn(styles.inputAutocomplete, className)}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete='off'
          onClick={handleInputClick}
          {...otherProps}
        />
        <Popper
          open={isDropdownOpen && !!autocompleteItems.map(item => item.toLowerCase()).filter(item => item.includes(value?.toLowerCase())).length}
          anchorEl={dropdownAnchorEl}
          className={styles.dropdown}
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
          {autocompleteItems.map(item => item.toLowerCase()).filter(item => item.includes(value?.toLowerCase())).map(item => (
            <div
              key={item}
              className={styles.item}
              onClick={() => {
                setValue(item[0].toUpperCase() + item.slice(1))
                handleCloseDropdown()
              }}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </div>
          ))}
        </Popper>
      </div>
    </ClickAwayListener>
  )
}
