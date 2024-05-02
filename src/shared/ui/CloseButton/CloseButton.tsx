import styles from './CloseButton.module.scss'
import { Button, ComponentButtonProps } from '../Button';
import Xmark from '@images/x-mark.svg'
import cn from "classnames"

export const CloseButton = ({ className, ...props }: ComponentButtonProps) => {
  return (
    <Button className={cn(styles.closeButton, className)} {...props}>
      <Xmark width={24} height={24} />
    </Button>
  )
}
