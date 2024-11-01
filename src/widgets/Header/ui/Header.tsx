import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import FilterIcon from "@images/filter.svg";
import SidebarIcon from "@images/category.svg";
import SearchIcon from "@images/search.svg";
import Chevron from "@images/chevron-left.svg";
import { Link } from 'react-router-dom';
import { RouterPaths } from '@src/app/router';
import cn from 'classnames';
import { Text, TextSize, TextWeight } from "@shared/ui/Text";
import { useSelector } from "react-redux";
import { SortBySelectors } from "@entities/SortBy/model/SortBy.selector";
import { sortByNames } from "@entities/SortBy";
import { FiltersSelectors } from "@entities/Filters";
import styles from './Header.module.scss';
import { HeaderButtonsState } from "@shared/ui/MainLayout/model/mainLayout.models";
import { Role, UserSelectors } from "@entities/User";
import { SearchOnMap } from "@features/SearchOnMap";
import { ApplicationModel } from "@entities/Application";
import Plus from "@images/plus.svg"
import Download from "@images/download.svg"
import { useGetData } from "@shared/hook/useGetData";
import { InfoBlockIconColor } from "@shared/ui/InfoBlock";

interface HeaderProps {
  className?: string;
  buttonsState: HeaderButtonsState;
  handleButtonsStateToggle: (name: keyof HeaderButtonsState) => void;
  isFiltersDisabled?: boolean;
  isTablet?: boolean;
  isMobile?: boolean;
  applications?: ApplicationModel[]
  setPoints?: (point: [number, number]) => void
}

export const Header = (props: HeaderProps) => {
  const {
    className,
    buttonsState: { search, sortBy, filters },
    handleButtonsStateToggle,
    isFiltersDisabled,
    isMobile,
    isTablet,
    applications,
    setPoints
  } = props;

  const userRole = useSelector(UserSelectors.selectUserRole);

  const filterClasses = cn(
    styles.toggleButton,
    styles.filter,
    { [styles.activeFilter]: filters },
    { [styles.disabledFilters]: isFiltersDisabled }
  )

  const sortingClasses = cn(
    styles.toggleButton,
    styles.sorting,
    { [styles.activeSorting]: sortBy },
    { [styles.disabledFilters]: isFiltersDisabled }
  )

  const searchClasses = cn(
    styles.toggleButton,
    styles.searchButton,
    { [styles.activeSearch]: search },
    { [styles.disabledFilters]: isFiltersDisabled }
  )

  const sortByValue = useSelector(SortBySelectors.selectSortByValue);
  const allFilters = useSelector(FiltersSelectors.selectAllFilters);
  const filteredValues = Object.values(allFilters).filter(filter => filter !== undefined && filter !== "");

  const { isLoading: isOrdersExportLoading, refetch: exportOrders } = useGetData({
    url: "/api/v1/orders-export",
    isEnabled: false,
    params: { ...allFilters },
    withAuthToken: true,
  });

  return (
    <div className={cn(styles.header, className)}>
      {isTablet &&
        <Button className={cn(styles.toggleButton)} onClick={() => handleButtonsStateToggle("burger")}>
          <SidebarIcon width={18} height={18} />
        </Button>
      }
      <Button className={filterClasses} onClick={() => handleButtonsStateToggle("filters")}>
        {!!filteredValues.length &&
          <div className={styles.counter}>{filteredValues.length}</div>
        }
        <FilterIcon width={18} height={18} />
        <Text weight={TextWeight.MEDIUM} size={TextSize.M} className={styles.buttonText}>Фильтры</Text>
      </Button>
      <Button className={sortingClasses} onClick={() => handleButtonsStateToggle("sortBy")}>
        <Text weight={TextWeight.MEDIUM} size={TextSize.M} className={styles.buttonText}>{sortByNames[sortByValue]}</Text>
        <Chevron width={18} height={18} />
      </Button>
      {!isMobile ? (
        <SearchOnMap applications={applications} className={cn(styles.searchWrapper, { [styles.disabledFilters]: isFiltersDisabled })} setPoints={setPoints} />
      )
        : (
          <Button className={searchClasses} onClick={() => handleButtonsStateToggle("search")}>
            <SearchIcon width={18} height={18} />
          </Button>
        )}
      {userRole === Role.LOGIST &&
        <div className={styles.buttons}>
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
              {!isMobile ? 'Разместить заявку' : <Plus />}
            </Button>
          </div>
          {
            !isMobile ?
              <div className={styles.buttonWrapper}>
                <Button
                  className={styles.unloadButton}
                  theme={ButtonTheme.GREY}
                  size={ButtonSize.S}
                  onClick={exportOrders}
                >
                  Выгрузить заявки
                </Button>
              </div>
              :
              <Button
                className={styles.toggleButton}
                withConfirm
                alertPopupProps={{
                  confirmText: "Вы действительно хотите выгрузить заявки?",
                  additionalText: "Все заявки по выбранным фильтрам будут выгружены в WhatsApp",
                  iconColor: InfoBlockIconColor.ACCENT,
                  buttonThemes: {
                    confirm: ButtonTheme.OUTLINE
                  }
                }}
                isLoading={isOrdersExportLoading}
                onClick={exportOrders}
              >
                <Download width={24} height={24} />
              </Button>
          }
        </div>
      }
    </div>
  )
}
