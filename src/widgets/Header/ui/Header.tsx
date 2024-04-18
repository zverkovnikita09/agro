import {Input} from "@shared/ui/Input";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import FilterIcon from "@images/filter.svg";
import Chevron from "@images/chevron-left.svg";
import {Link} from 'react-router-dom';
import {RouterPaths} from '@src/app/router';
import cn from 'classnames';
import {Text, TextSize, TextWeight} from "@shared/ui/Text";
import {useSelector} from "react-redux";
import {SortBySelectors} from "@entities/SortBy/model/SortBy.selector";
import {sortByNames} from "@entities/SortBy";
import {FiltersSelectors} from "@entities/Filters";
import styles from './Header.module.scss';

interface HeaderProps {
  className?: string;
  isFiltersOpen?: boolean;
  toggleFiltersOpen?: () => void;
  isSortingOpen?: boolean;
  toggleSortingOpen?: () => void;
  isFiltersDisabled?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { className, isFiltersOpen, toggleFiltersOpen, isSortingOpen, toggleSortingOpen, isFiltersDisabled } = props;

  const sortByValue = useSelector(SortBySelectors.selectSortByValue);
  const allFilters = useSelector(FiltersSelectors.selectAllFilters);
  const filteredValues = Object.values(allFilters).filter(filter => filter !== undefined && filter !== "");

  return (
    <div className={cn(styles.header, className)}>
      <Button className={cn(styles.filter, {[styles.activeFilter]: isFiltersOpen}, {[styles.disabledFilters]: isFiltersDisabled})} onClick={toggleFiltersOpen}>
        {!!filteredValues.length &&
          <div className={styles.counter}>{filteredValues.length}</div>
        }
        <FilterIcon width={18} height={18} />
        <Text weight={TextWeight.MEDIUM} size={TextSize.M} className={styles.buttonText}>Фильтры</Text>
      </Button>
      <Button className={cn(styles.sorting, {[styles.activeSorting]: isSortingOpen}, {[styles.disabledFilters]: isFiltersDisabled})} onClick={toggleSortingOpen}>
        <Text weight={TextWeight.MEDIUM} size={TextSize.M} className={styles.buttonText}>{sortByNames[sortByValue]}</Text>
        <Chevron width={18} height={18} />
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
