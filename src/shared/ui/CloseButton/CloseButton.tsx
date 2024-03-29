import styles from './CloseButton.module.scss'
import { Button, ComponentButtonProps } from '../Button';
import Xmark from '@images/x-mark.svg'

export const CloseButton = (props: ComponentButtonProps) => {
  return (
    <Button className={styles.closeButton} {...props}>
      <Xmark width={24} height={24} />
    </Button>
  )
}
