import cn from 'classnames';
import styles from './User.module.scss'

interface UserProps {
  className?: string;
}

export const User = (props: UserProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.user, className)}>
    
    </div>
  )
}
