import cn from 'classnames';
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Select } from '@shared/ui/Select';
import { useState } from 'react';
import LocationIcon from '@images/location.svg'
import styles from './Header.module.scss';
import { Calendar } from '@shared/ui/Calendar';

interface HeaderProps {
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { className } = props;
  const [value, setValue] = useState("");

  return (
    <div className={cn(styles.header, className)}>
      <div className={cn(styles.city, { [styles.placeholder]: !value })}>

        <LocationIcon className={styles.location} />
        <Select
          options={["Вся Россия", "Москва", "Воронеж", "Ханты-Мансийский Автономный округ"]}
          setValue={setValue}
          value={value}
          className={styles.citySelect}
          togglerClassName={styles.selectToggler}
          placeholder='Выберите город'
          noArrow
        />
      </div>
      <Input
        className={styles.search}
        placeholder='Введите пункт погрузки'
        autoComplete='off'
        withSearchIcon
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
