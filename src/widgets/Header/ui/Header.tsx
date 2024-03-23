import cn from 'classnames';
import styles from './Header.module.scss'
import {Input} from "@shared/ui/Input";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";

interface HeaderProps {
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const {className} = props;

  return (
    <div className={cn(styles.header, className)}>
      <div className={styles.city}>город</div>
      <Input
        className={styles.search}
        placeholder='Введите пункт погрузки'
      />
      <div className={styles.buttonWrapper}>
        <Button
          className={styles.button}
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
        >
          Разместить заявку
        </Button>
      </div>
    </div>
  )
}
