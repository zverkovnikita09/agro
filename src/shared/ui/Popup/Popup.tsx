import cn from 'classnames';
import style from './Popup.module.scss'
import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { Portal } from '../Portal';
import { CloseButton } from '../CloseButton';

export interface PopupProps {
  children?: React.ReactNode,
  isActive: boolean,
  closePopup: () => void,
}

export const Popup = ({ children, isActive, closePopup }: PopupProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  const closePopupOnEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closePopup()
  }, [closePopup])

  useEffect(() => {
    if (isActive) document?.addEventListener("keydown", closePopupOnEsc)
    return () => document?.removeEventListener("keydown", closePopupOnEsc)
  }, [closePopupOnEsc, isActive])

  const closePopupByOverlayClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === overlayRef.current) closePopup()
  }

  return (
    <Portal>
      <div
        className={cn(style.overlay, { [style.active]: isActive })}
        onClick={closePopupByOverlayClick}
        ref={overlayRef}
      >
        <div className={style.content}>
          <CloseButton className={style.close} onClick={closePopup} />
          {children}
        </div>
      </div>
    </Portal>
  )
}