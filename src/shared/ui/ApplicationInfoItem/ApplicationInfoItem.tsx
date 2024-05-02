import cn from 'classnames';
import styles from './ApplicationInfoItem.module.scss'
import { Text, TextColor, TextSize, TextWeight } from '../Text';
import { PropsWithChildren } from 'react';

interface ApplicationInfoItemProps {
  className?: string;
  title: string
}

export const ApplicationInfoItem = (props: PropsWithChildren<ApplicationInfoItemProps>) => {
  const { className, children, title } = props;

  return (
    <div className={cn(styles.applicationInfoItem, className)}>
      <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>{title}</Text>
      <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>
        {children}
      </Text>
    </div>
  )
}
