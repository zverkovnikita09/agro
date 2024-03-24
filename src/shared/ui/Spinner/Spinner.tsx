import styles from './Spinner.module.scss'
import Leaf from '@images/leaf.svg'
import cn from 'classnames'

export enum SpinnerTheme {
  PRIMARY = "primary",
  SECONDARY = 'secondary'
}

interface SpinnerProps {
  theme?: SpinnerTheme;
  className?: string;
}

export const Spinner = ({ theme = SpinnerTheme.PRIMARY, className }: SpinnerProps) => {
  return (
    <div className={cn(styles.spinner, styles[theme], className)}>
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
      <Leaf className={styles.leaf} width={4} height={9} viewBox='0 0 4 9' />
    </div>
  )
};