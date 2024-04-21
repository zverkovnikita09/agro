import cn from 'classnames';
import styles from './MainLayout.module.scss'
import {Navigate, useLocation, useNavigate, useOutlet} from "react-router-dom";
import {Header} from "@widgets/Header";
import {Sidebar} from "@widgets/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {setUser, UserSelectors} from "@entities/User";
import {RouterPaths} from "@src/app/router";
import {useGetData} from "@shared/hook/useGetData";
import {LoadingBlock} from "@shared/ui/LoadingBlock";
import {createContext, useLayoutEffect, useState} from 'react';
import {Filters} from "@entities/Filters";
import {YandexMap} from "@widgets/YandexMap";
import {Notifications} from '@entities/Notifications';
import {SortBy} from "@entities/SortBy";
import {useWindowSize} from "@shared/hook/useWindowSize";
import {isMobile, isMobileSmall, isTablet} from "@shared/lib/deviceSizeCheck";
import {HeaderButtonsState} from "@shared/ui/MainLayout/model/mainLayout.models";
import {Input} from "@shared/ui/Input";

interface MainLayoutContextProps {
  openOverlay: () => void;
  closeOverlay: () => void;
  disableFilters: (status: boolean) => void;
}

export const MainLayoutContext = createContext<MainLayoutContextProps>({} as MainLayoutContextProps)

export const MainLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [isFiltersDisabled, setFiltersDisabled] = useState(false)

  const [headerButtonsState, setHeaderButtonsState] = useState<HeaderButtonsState>({
    burger: false,
    filters: false,
    search: false,
    sortBy: false,
  });

  const handleButtonsStateToggle = (name: keyof HeaderButtonsState, buttonValue?: boolean) => {
    const newButtonState = Object.entries(headerButtonsState).reduce<HeaderButtonsState>((previousValue, currentValue) => {
      const [key, initialValue] = currentValue;
      const value = buttonValue !== undefined ? buttonValue : !initialValue;

      return {...previousValue, [key]: key === name && value}
    }, {} as HeaderButtonsState)

    setHeaderButtonsState(newButtonState);
  }

  const openOverlay = () => setIsOverlayOpen(true)
  const closeOverlay = () => setIsOverlayOpen(false)

  const disableFilters = (status: boolean) => {
    setFiltersDisabled(status)
  }

  const token = useSelector(UserSelectors.selectToken);
  const dispatch = useDispatch();
  const location = useLocation();

  const {isLoading} = useGetData({
    url: '/api/v1/user',
    withAuthToken: true,
    isEnabled: !!token,
    dataFlag: true,
    onSuccess: (user) => {
      dispatch(setUser(user))
    },
    onError: () => navigate(RouterPaths.LOGIN),
  });

  if (!token) return <Navigate to={RouterPaths.LOGIN} replace={true}/>

  if (isLoading) return <LoadingBlock/>

  return (
    <MainLayoutContext.Provider value={{openOverlay, closeOverlay, disableFilters}}>
      <Notifications/>
      <div className={cn(styles.overlay, {[styles.active]: isOverlayOpen})}/>

      <div className={styles.mainLayout}>
        <YandexMap className={styles.map}/>

        <div className={styles.header}>
          <Header
            handleButtonsStateToggle={handleButtonsStateToggle}
            buttonsState={headerButtonsState}
            isFiltersDisabled={isFiltersDisabled}
            isTablet={isTablet(windowSize)}
            isMobile={isMobile(windowSize)}
          />
          <Filters
            isOpen={headerButtonsState.filters}
            closeFilters={() => handleButtonsStateToggle("filters", false)}
          />
          <SortBy
            isOpen={headerButtonsState.sortBy}
            closeSorting={() => handleButtonsStateToggle("sortBy", false)}
          />
          {isMobile(windowSize) &&
              <Input
                wrapperClassName={cn(styles.search, {[styles.searchOpen]: headerButtonsState.search})}
                className={styles.searchInput}
                placeholder='Введите пункт погрузки'
                autoComplete='off'
                withSearchIcon
              />
          }
        </div>

        {!isTablet(windowSize)
          ? (
            <div className={styles.sidebar}>
              <Sidebar/>
            </div>
          )
          : (
            <div className={cn(styles.burger, {[styles.burgerOpen]: headerButtonsState.burger})}>
              <Sidebar isMobile onBurgerClose={() => handleButtonsStateToggle("burger")} />
            </div>
          )
        }

        {outlet &&
          <div className={cn(styles.content, {[styles.mainPage]: location.pathname === RouterPaths.MAIN})}>
            {outlet}
          </div>
        }
      </div>
    </MainLayoutContext.Provider>
  )
}
