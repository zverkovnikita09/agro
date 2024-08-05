import cn from 'classnames';
import styles from './NotFoundBlock.module.scss'
import Truck from '@images/truck.svg'
import {SVGProps, VFC} from "react";

interface NotFoundBlockProps {
  className?: string;
  title?: string;
  additionalText?: string;
  Icon?:  VFC<SVGProps<SVGSVGElement>>
}

export const NotFoundBlock = (props: NotFoundBlockProps) => {
  const { className, additionalText, title = "Не найдено", Icon = Truck  } = props;

  return (
    <div className={cn(styles.notFoundBlock, className)}>
      <Icon height={46} width={46} />
      <p className={styles.title}>{title}</p>
      {additionalText && <p className={styles.additionalText}>{additionalText}</p>}
    </div>
  )
}
