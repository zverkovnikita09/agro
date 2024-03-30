import cn from 'classnames';
import styles from './RadialInfo.module.scss'

interface RadialInfoProps {
  className?: string;
}

export const RadialInfo = (props: RadialInfoProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.radialInfo, className)}>
        <svg viewBox='0 0 42 42'>
          <circle cx='21' cy='21' r='15.9154' fill='var(--white-color)'></circle>
          <circle cx='21' cy='21' r='15.9154' fill='transparent' strokeWidth='4px'
                  stroke='var(--disabled-color)'></circle>
          <circle cx='21' cy='21' r='15.9154' fill='transparent' strokeWidth='5px' stroke='var(--primary-yellow)'
                  strokeDasharray='70 30' strokeLinecap='round'></circle>
        </svg>
        <div className={styles.radialInfo__text}>70%</div>
    </div>
  )
}
