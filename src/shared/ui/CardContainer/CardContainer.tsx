import cn from 'classnames';
import styles from './CardContainer.module.scss'
import { PropsWithChildren, forwardRef } from 'react';

interface CardContainerProps {
  className?: string;
  style?: React.CSSProperties;
}

export const CardContainer = forwardRef<HTMLDivElement, PropsWithChildren<CardContainerProps>>((props, ref) => {
  const { className, children, style } = props;

  return (
    <div className={cn(styles.cardContainer, className)} ref={ref} style={style}>
      {children}
    </div>
  )
})

CardContainer.displayName = 'CardContainer'