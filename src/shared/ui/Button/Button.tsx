import cn from 'classnames';
import { ButtonHTMLAttributes, MouseEvent, PropsWithChildren, RefCallback, RefObject } from 'react'
import { Spinner, SpinnerTheme } from '../Spinner/Spinner';
import style from './Button.module.scss'
import { Link } from 'react-router-dom';
import { usePopupState } from '@shared/hook/usePopupState';
import { ConfirmPopup, ConfirmPopupProps } from '../ConfirmPopup';
import { PopupProps } from '../Popup';

export enum ButtonSize {
  PRIMARY = '',
  S = 'size_s',
  SM = 'size_sm',
  M = 'size_m',
}

export enum ButtonTheme {
  PRIMARY = '',
  ACCENT = 'accent',
  ACCENT_WITH_BLACK_TEXT = 'accent_with_black_text',
  OUTLINE = 'outline',
  OUTLINE_ACCENT = 'outline_accent',
  OUTLINE_ALERT = 'outline_alert',
  GREY = 'grey',
}

interface ButtonProps {
  size?: ButtonSize
  theme?: ButtonTheme
  isLoading?: boolean
  loadingText?: string
  as?: "button"
  to?: string
  state?: Record<string, any>
  buttonRef?: RefObject<HTMLButtonElement> | RefCallback<HTMLButtonElement>
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: (e?: MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  disabled?: boolean
  fullWidth?: boolean;
  tabIndex?: number;
}

interface AnchorProps extends Omit<ButtonProps, "as" | "buttonRef" | "onClick"> {
  as?: "a" | typeof Link
  buttonRef?: RefObject<HTMLAnchorElement> | RefCallback<HTMLAnchorElement>
  href?: string
  onClick?: (e?: MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export type ComponentButtonProps =
  (ButtonProps | AnchorProps)
  & ({ withConfirm?: true, alertPopupProps: Omit<ConfirmPopupProps, keyof PopupProps> }
    | { withConfirm?: false, alertPopupProps?: Omit<ConfirmPopupProps, keyof PopupProps> });

export const Button = (props: PropsWithChildren<ComponentButtonProps>) => {
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
    state,
    withConfirm,
    alertPopupProps,
    onClick,
    ...otherProps
  } = props;

  const additionalClasses = [
    className,
    style[size],
    style[theme],
    { [style.fullWidth]: fullWidth }
  ]

  const Component = as;

  const { isOpen: isConfirmOpen, closePopup: closeConfirm, openPopup: openConfirm } = usePopupState();

  return (
    <>
      {withConfirm && (
        <ConfirmPopup
          closePopup={closeConfirm}
          {...(alertPopupProps ?? {})}
          confirmText={alertPopupProps?.confirmText || 'Подтвердите действие'}
          onCancelButtonClick={onClick}
          isActive={isConfirmOpen}
        />
      )}
      <Component
        className={cn(style.button, additionalClasses)}
        type={as === 'button' ? type : undefined}
        disabled={isLoading || disabled}
        //@ts-ignore
        ref={buttonRef}
        state={state}
        //@ts-ignore
        onClick={!withConfirm ? onClick : openConfirm}
        {...otherProps}
      >
        {isLoading &&
          <div className={style.loading}>
            <Spinner className={style.spinner} theme={SpinnerTheme.SECONDARY} />
          </div>
        }
        {children}
      </Component>
    </>
  )
}