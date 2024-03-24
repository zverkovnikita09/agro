import cn from 'classnames';
import { ButtonHTMLAttributes, MouseEvent, ReactNode, RefCallback, RefObject } from 'react'
import { Spinner, SpinnerTheme } from '../Spinner/Spinner';
import style from './Button.module.scss'
import { Link } from 'react-router-dom';
/* import { PopupProps } from '../Popup';
import { ConfirmPopupProps, ConfirmPopup } from '../ConfirmPopup'; */
import { usePopupState } from '@shared/hook/usePopupState';

export enum ButtonSize {
  PRIMARY = '',
  S = 'size_s',
  M = 'size_m'
}

export enum ButtonTheme {
  PRIMARY = '',
  ACCENT = 'accent',
  ACCENT_WITH_BLACK_TEXT = 'accent_with_black_text',
  OUTLINE = 'outline',
  BLACK = 'black',
  GREY = 'grey',
}

interface ButtonProps {
  children?: ReactNode
  size?: ButtonSize
  theme?: ButtonTheme
  isLoading?: boolean
  loadingText?: string
  as?: "button"
  to?: string
  buttonRef?: RefObject<HTMLButtonElement> | RefCallback<HTMLButtonElement>
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  disabled?: boolean
  fullWidth?: boolean;
}

interface AnchorProps extends Omit<ButtonProps, "as" | "buttonRef" | "onClick"> {
  as?: "a" | typeof Link
  buttonRef?: RefObject<HTMLAnchorElement> | RefCallback<HTMLAnchorElement>
  href?: string
  onClick?: (e?: MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

type ComponentButtonProps =
  (ButtonProps | AnchorProps)
/*  & ({ withAlert?: true, alertPopupProps: Omit<ConfirmPopupProps, keyof PopupProps> }
   | { withAlert?: false, alertPopupProps?: Omit<ConfirmPopupProps, keyof PopupProps> }); */

export const Button = (props: ComponentButtonProps) => {
  const {
    type = 'button',
    className,
    children,
    size = ButtonSize.PRIMARY,
    theme = ButtonTheme.PRIMARY,
    isLoading,
    disabled,
    loadingText,
    as = "button",
    buttonRef,
    fullWidth,
    /*  withAlert,
     alertPopupProps, */
    /*     onClick, */
    ...otherProps
  } = props;

  const additionalClasses = [
    className,
    style[size],
    style[theme],
    { [style.fullWidth]: fullWidth }
  ]

  const Component = as;

  /* const { isOpen: isConfirmOpen, closePopup: closeConfirm, openPopup: openConfirm } = usePopupState(); */

  return (
    <>
      {/*  {withAlert && (
        <ConfirmPopup
          closePopup={closeConfirm}
          {...(alertPopupProps ?? {})}
          confirmText={alertPopupProps?.confirmText || 'Подтвердите действие'}
          onPrimaryButtonClick={onClick}
          isActive={isConfirmOpen}
        />
      )} */}
      <Component
        className={cn(style.button, additionalClasses)}
        type={as === 'button' ? type : undefined}
        disabled={isLoading || disabled}
        //@ts-ignore
        ref={buttonRef}
        //@ts-ignore
        /* onClick={!withAlert ? onClick : openConfirm} */
        {...otherProps}
      >
        {isLoading ?
          <div className={style.loading}>
            {loadingText ?? 'Отправка'} <Spinner className={style.spinner} theme={SpinnerTheme.SECONDARY} />
          </div>
          : children
        }
      </Component>
    </>
  )
}