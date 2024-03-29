import cn from 'classnames';
import styles from './Accordion.module.scss'

interface AccordionProps {
  className?: string;
}

export const Accordion = (props: AccordionProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.accordion, className)}>
    
    </div>
  )
}
