import cn from 'classnames';
import styles from './InputAutocomplete.module.scss'
import { Input } from '../Input/Input';
import { Dropdown } from '../Dropdown';
import { useToggleDropdown } from '@shared/hook/useToggleDropdown';
import { useRef } from 'react';

interface InputAutocompleteProps {
  className?: string;
  autocompleteItems?: string[];
  onlyAutocompleteValue?: boolean;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string
}

export const InputAutocomplete = (props: InputAutocompleteProps) => {
  const {
    className,
    autocompleteItems,
    onlyAutocompleteValue,
    value,
    setValue,
    ...otherProps
  } = props;

  const [isDropdownOpen, toggleDropdown] = useToggleDropdown(false);
  const inputRef = useRef(null);

  return (
    <div className={cn(styles.inputAutocomplete, className)}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete='off'
        onFocus={toggleDropdown}
        {...otherProps}
      />
      {/* {
        <Dropdown isOpen={isDropdownOpen && !!autocompleteItems?.length} onClose={toggleDropdown} targetRef={inputRef}>
          {autocompleteItems?.map((item) => item)}
        </Dropdown>
      } */}
    </div>
  )
}
