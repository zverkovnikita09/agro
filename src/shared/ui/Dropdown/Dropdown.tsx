import cn from 'classnames';
import { PropsWithChildren, RefObject, useLayoutEffect, useRef, useState } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useDocumentEvent } from '@shared/hook/useDocumentEvent';
import { CardContainer } from '../CardContainer';
import style from './Dropdown.module.scss'

interface SelectDropdownProps {
  targetRef: RefObject<HTMLElement>
  horizontalPosition?: "left" | "right"
  width?: number | "auto" | "100%"
  maxHeight?: number
  className?: string
  isOpen: boolean
  onClose: () => void
  fullWidth?: boolean
  noBorder?: boolean
}

export const Dropdown = (props: PropsWithChildren<SelectDropdownProps>) => {
  const {
    targetRef,
    horizontalPosition = "right",
    children,
    width,
    maxHeight = 300,
    className = '',
    isOpen,
    onClose,
    fullWidth,
    noBorder,
  } = props;

  const [verticalPosition, setVerticalPosition] = useState<"top" | "bottom">("top")
  const dropdownRef = useRef<HTMLDivElement>(null);

  const calcCoords = () => {
    const rect = targetRef.current?.getBoundingClientRect();

    /**
     * Проверка достаточно ли места для отображения контента (8 - размер margin)
     */
    if (window.innerHeight - rect!.bottom < maxHeight + 8) {
      setVerticalPosition("bottom")
    } else {
      setVerticalPosition("top")
    }
  }

  useLayoutEffect(() => {
    targetRef.current && calcCoords();
  }, [])

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  };

  useDocumentEvent('keydown', closeOnEsc, isOpen);

  if (!isOpen) return null

  return (
    <ClickAwayListener onClickAway={onClose}>
      <CardContainer
        ref={dropdownRef}
        className={cn(style.dropdown,
          className,
          style[verticalPosition],
          { [style.fullWidth]: fullWidth },
          { [style.noBorder]: noBorder }
        )}
        style={{ [horizontalPosition]: 0, width, maxHeight }}>
        {children}
      </CardContainer>
    </ClickAwayListener>
  )
}