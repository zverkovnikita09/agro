import {Input} from "@shared/ui/Input";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {useState} from 'react';
import FilterIcon from "@images/filter.svg";
import styles from './Header.module.scss';
import {Link} from 'react-router-dom';
import {RouterPaths} from '@src/app/router';
import cn from 'classnames';
import {Text, TextSize, TextWeight} from "@shared/ui/Text";

interface HeaderProps {
  className?: string;
  isFiltersOpen?: boolean;
  toggleFiltersOpen: () => void;
}

export const Header = (props: HeaderProps) => {
  const { className, isFiltersOpen, toggleFiltersOpen } = props;
  const [value, setValue] = useState("");

  return (
    <div className={cn(styles.header, className)}>
      <Button className={cn(styles.filter, {[styles.activeFilter]: isFiltersOpen})} onClick={toggleFiltersOpen}>
        <FilterIcon width={18} height={18} />
        <Text weight={TextWeight.MEDIUM} size={TextSize.M}>Фильтры</Text>
      </Button>
      {/* <div className={cn(styles.city, { [styles.placeholder]: !value })}>
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
      </div> */}
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
          as={Link}
          to={RouterPaths.NEW_APPLICATION}
          state={{
            allowPrevUrl: true
          }}
        >
          Разместить заявку
        </Button>
      </div>
    </div>
  )
}
