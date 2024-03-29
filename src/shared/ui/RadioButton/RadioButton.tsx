import cn from 'classnames';
import styles from './RadioButton.module.scss'

interface RadioButtonProps {
  className?: string;
}

export const RadioButton = (props: RadioButtonProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.radioButton, className)}>
    
    </div>
  )
}
