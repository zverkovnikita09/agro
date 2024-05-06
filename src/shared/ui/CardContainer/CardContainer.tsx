import cn from 'classnames';
import styles from './CardContainer.module.scss'
import { HTMLAttributes, PropsWithChildren, forwardRef } from 'react';
import { Title, TitleSize } from "@shared/ui/Title";

interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
  titleName?: string;
}

export const CardContainer = forwardRef<HTMLDivElement, PropsWithChildren<CardContainerProps>>((props, ref) => {
  const { className, children, style, titleName, ...otherProps } = props;

  return (
    <div className={cn(styles.cardContainer, className)} ref={ref} style={style} {...otherProps}>
      {titleName &&
        <Title as="h2" size={TitleSize.APPLICATION_TITLE}>
          {titleName}
        </Title>
      }
      {children}
    </div>
  )
})

CardContainer.displayName = 'CardContainer'