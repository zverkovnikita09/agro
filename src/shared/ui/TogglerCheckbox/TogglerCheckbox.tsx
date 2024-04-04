import style from "./TogglerCheckbox.module.scss";
import {forwardRef, useId} from "react";
import cn from "classnames";
import {Text, TextSize, TextWeight} from "@shared/ui/Text";


interface TogglerCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode,
    checked?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
    textPosition?: 'left' | 'right'
}

export const TogglerCheckbox = forwardRef<HTMLInputElement, TogglerCheckboxProps>((props, ref) => {
    const {
        children,
        className = '',
        textPosition = 'left',
        ...otherProps
    } = props;

    const id = useId();

    return (
        <label htmlFor={id} className={cn(style.togglerCheckbox, {}, [className])}>
            <input id={id} className={cn(style.togglerCheckbox__input, {}, ['hiddenInput'])} type='checkbox' ref={ref} {...otherProps} />
            { textPosition === 'left' &&
                <Text weight={TextWeight.SEMI_BOLD} size={TextSize.L}>{children}</Text>
            }
            <span className={style.togglerCheckbox__check}>

            </span>
            { textPosition === 'right' &&
                <Text weight={TextWeight.SEMI_BOLD} size={TextSize.L}>{children}</Text>
            }
        </label>
    )
}
)
