import cn from 'classnames';
import styles from './Checkbox.module.scss'
import { BsCheck } from "react-icons/bs";
import { PropsWithChildren, useId } from 'react';

export interface CheckboxProps {
  className?: string;
  checked: boolean;
  setChecked: (name: string, value: boolean) => void;
  name: string;
}

export const Checkbox = (props: PropsWithChildren<CheckboxProps>) => {
  const { className, children, checked, setChecked, name } = props;
  const id = useId()

  return (
    <label htmlFor={id} className={cn(styles.checkbox, className)}>
      <input
        type="checkbox"
        className={cn(styles.input, 'hiddenInput')}
        id={id}
        checked={checked}
        onChange={(e) => setChecked?.(e.target.name, e.target.checked)}
        name={name}
      />
      <div className={styles.inputBox}>
        {checked && <BsCheck />}
      </div>
      {children}
    </label>
  )
}
