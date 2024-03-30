import styles from "./RadioButton.module.scss";
import { forwardRef, useId } from "react";
import cn from "classnames";
import { Text, TextSize, TextWeight } from "../Text";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode,
  className?: string
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const id = useId();
  const {
    children,
    className = '',
    ...otherProps
  } = props;

  return (
    <label className={cn(styles.radioButton, className)}>
      <input
        id={id}
        className={cn(styles.input, 'hiddenInput')}
        type='radio'
        ref={ref}
        {...otherProps}
      />
      <div className={styles.inputBox} />
      <Text size={TextSize.L} weight={TextWeight.MEDIUM}>{children}</Text>
    </label>
  )
}
)
