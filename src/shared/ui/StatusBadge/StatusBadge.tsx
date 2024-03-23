import cn from 'classnames';
import styles from './StatusBadge.module.scss'

export enum StatusType {
  ACTIVE = 'active',
  ON_PAUSE = 'on_pause',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
}
interface StatusBadgeProps {
  className?: string;
  status: StatusType
}

export const StatusBadge = (props: StatusBadgeProps) => {
  const { className, status } = props;

  const additionalClasses = [
    className,
    styles[status],
  ]

  return (
    <div className={cn(styles.statusBadge, additionalClasses)}>
      Активная
    </div>
  )
}
