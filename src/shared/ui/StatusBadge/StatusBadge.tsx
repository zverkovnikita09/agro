import cn from 'classnames';
import {PropsWithChildren} from "react";
import styles from './StatusBadge.module.scss'

export enum StatusType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
}
interface StatusBadgeProps {
  className?: string;
  status: StatusType;
}

export const StatusBadge = (props: PropsWithChildren<StatusBadgeProps>) => {
  const { className, status, children } = props;

  const additionalClasses = [
    className,
    styles[status],
  ]

  return (
    <div className={cn(styles.statusBadge, additionalClasses)}>
      {children}
    </div>
  )
}
