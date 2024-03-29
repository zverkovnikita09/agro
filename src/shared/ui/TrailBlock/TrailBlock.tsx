import cn from 'classnames';
import styles from './TrailBlock.module.scss'

interface TrailBlockProps {
  className?: string;
  destinationFrom: string;
  destinationTo: string;
}

export const TrailBlock = (props: TrailBlockProps) => {
  const { className, destinationFrom, destinationTo } = props;

  return (
    <div className={cn(styles.trailBlock, className)}>
        <div className={styles.trailItem}>
          {destinationFrom}

        </div>
        <div className={styles.trailItem}>
          {destinationTo}
        </div>
    </div>
  )
}
