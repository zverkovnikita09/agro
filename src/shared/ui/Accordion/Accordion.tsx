import cn from 'classnames';
import { PropsWithChildren, useState } from "react";
import { Text, TextSize, TextWeight } from "@shared/ui/Text";
import PlusIcon from "@images/plus.svg";
import MinusIcon from "@images/minus.svg";
import styles from './Accordion.module.scss';

interface AccordionProps {
  className?: string;
  accordionTitle?: string;
  classes?: {
    contentWrapper?: string
    content?: string
  }
}

export const Accordion = (props: PropsWithChildren<AccordionProps>) => {
  const { className, accordionTitle, children, classes } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(styles.accordion, className)}>
      <div className={styles.title} onClick={() => setIsOpen(prev => !prev)}>
        <Text size={TextSize.L} weight={TextWeight.MEDIUM}>{accordionTitle}</Text>
        {isOpen ? <MinusIcon height={11} width={11} /> : <PlusIcon height={11} width={11} />}
      </div>
      <div className={cn(styles.contentWrapper, { [styles.open]: isOpen }, classes?.contentWrapper)}>
        <div className={cn(styles.content, classes?.content)}>
          {children}
        </div>
      </div>
    </div>
  )
}
