import cn from 'classnames';
import styles from './NotFoundBlock.module.scss'
import Truck from '@images/truck.svg'

interface NotFoundBlockProps {
  className?: string;
  title?: string;
  additionalText?: string;
}

export const NotFoundBlock = (props: NotFoundBlockProps) => {
  const { className, additionalText, title = "Не найдено" } = props;

  return (
    <div className={cn(styles.notFoundBlock, className)}>
      <Truck height={46} width={46} />
      <p className={styles.title}>{title}</p>
      {additionalText && <p className={styles.additionalText}>{additionalText}</p>}
    </div>
  )
}
