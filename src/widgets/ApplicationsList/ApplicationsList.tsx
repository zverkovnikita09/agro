import cn from 'classnames';
import styles from './ApplicationsList.module.scss'
import { Application } from '@entities/Application';

export interface Application {
  id: number;
}
interface ApplicationsListProps {
  className?: string;
  applications: Application[];
}

export const ApplicationsList = (props: ApplicationsListProps) => {
  const { className, applications } = props;

  return (
    <div className={cn(styles.applicationsList, className)}>
      {applications.map(({id}) => (
        <div key={id} className={styles.application}>
          <Application id={id} />
        </div>
      ))}
    </div>
  )
}
