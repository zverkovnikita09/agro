import { BsCheck } from "react-icons/bs";
import { HiMinusSm } from "react-icons/hi";
import cn from 'classnames';
import styles from './ControlCheckbox.module.scss'
import { PropsWithChildren, useContext } from "react";
import { MultiCheckboxContext } from "./MultiCheckbox";

interface ControlCheckboxProps {
  className?: string;
}

export const ControlCheckbox = (props: PropsWithChildren<ControlCheckboxProps>) => {
  const { className, children } = props;

  const { childrenProps, status } = useContext(MultiCheckboxContext)

  const onCheckboxChange = () => {
    childrenProps.forEach(({ setChecked, name }) => setChecked?.(name, status === "not-checked"))
  }

  return (
    <div className={cn(styles.multiCheckbox, className)} onClick={onCheckboxChange}>
      <div className={cn(styles.inputBox, { [styles.checked]: status !== "not-checked" })}>
        {status === "all-checked" && <BsCheck />}
        {status === "some-checked" && < HiMinusSm />}
      </div>
      {children}
    </div>
  )
}