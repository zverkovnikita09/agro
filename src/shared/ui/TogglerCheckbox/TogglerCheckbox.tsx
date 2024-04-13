import style from "./TogglerCheckbox.module.scss";
import { forwardRef, useId } from "react";
import cn from "classnames";
import { Text, TextSize, TextWeight } from "@shared/ui/Text";


interface TogglerCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode,
  checked: boolean,
  setChecked: (value: boolean) => void,
  className?: string
  textPosition?: 'left' | 'right'
}

export const TogglerCheckbox = forwardRef<HTMLInputElement, TogglerCheckboxProps>((props, ref) => {
  const {
    children,
    className = '',
    textPosition = 'left',
    setChecked,
    ...otherProps
  } = props;

  const id = useId();

  return (
    <label htmlFor={id} className={cn(style.togglerCheckbox, [className])}>
      <input id={id}
        className={cn(style.input, 'hiddenInput')}
        type='checkbox'
        ref={ref}
        onChange={e => setChecked(e.target.checked)}
        {...otherProps}
      />
      {textPosition === 'left' &&
        <Text weight={TextWeight.SEMI_BOLD} size={TextSize.L}>{children}</Text>
      }
      <span className={style.check} />

      {textPosition === 'right' &&
        <Text weight={TextWeight.SEMI_BOLD} size={TextSize.L}>{children}</Text>
      }
    </label>
  )
}
)
