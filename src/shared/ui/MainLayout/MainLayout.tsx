import { RouterPaths } from "@src/app/router";
import cn from 'classnames';
import styles from './MainLayout.module.scss'
import { Navigate, useLocation, useNavigate, useOutlet } from "react-router-dom";
import { Header } from "@widgets/Header";
import { Sidebar } from "@widgets/Sidebar";
import { useSelector } from "react-redux";
import { UserSelectors, fetchUserData } from "@entities/User";
import { useGetData } from "@shared/hook/useGetData";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from 'react';
import { Filters, FiltersSelectors } from "@entities/Filters";
import { YandexMap } from "@widgets/YandexMap";
import { Notifications } from '@entities/Notifications';
import { SortBy, SortBySelectors } from "@entities/SortBy";
import { useWindowSize } from "@shared/hook/useWindowSize";
import { isMobile, isTablet } from "@shared/lib/deviceSizeCheck";
import { HeaderButtonsState } from "@shared/ui/MainLayout/model/mainLayout.models";
import { useAppDispatch } from '@src/app/store/model/hook';
import { SearchOnMap } from '@features/SearchOnMap';
import { ApplicationModel } from '@entities/Application';
import { OrdersExport } from "@features/OrdersExport";

interface MainLayoutContextProps {
  openOverlay: () => void;
  closeOverlay: () => void;
  applications?: ApplicationModel[]
  setApplications: Dispatch<SetStateAction<ApplicationModel[]>>
}

export const MainLayoutContext = createContext<MainLayoutContextProps>({} as MainLayoutContextProps)

export const MainLayout = () => {
  const routesWithHeader = [
    RouterPaths.MAIN,
    RouterPaths.CHECKLIST
  ]

  const outlet = useOutlet();
  const windowSize = useWindowSize();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [headerButtonsState, setHeaderButtonsState] = useState<HeaderButtonsState>({
    burger: false,
    filters: false,
    search: false,
    sortBy: false,
    exportOrder: false,
  });

  const handleButtonsStateToggle = (name: keyof HeaderButtonsState, buttonValue?: boolean) => {
    const newButtonState = Object.entries(headerButtonsState).reduce<HeaderButtonsState>((previousValue, currentValue) => {
      const [key, initialValue] = currentValue;
      const value = buttonValue !== undefined ? buttonValue : !initialValue;

      return { ...previousValue, [key]: key === name && value }
    }, {} as HeaderButtonsState)

    setHeaderButtonsState(newButtonState);
  }

  const openOverlay = () => setIsOverlayOpen(true)
  const closeOverlay = () => setIsOverlayOpen(false)

  const token = useSelector(UserSelectors.selectToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isLoading = useSelector(UserSelectors.selectIsUserDataLoading)
  const isError = useSelector(UserSelectors.selectIsUserDataError)

  const user = useSelector(UserSelectors.selectUserData)

  const showHeader = useMemo(() => {
    return routesWithHeader.includes(location.pathname as RouterPaths);
  }, [location])

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  const sortBy = useSelector(SortBySelectors.selectSortByValue);
  const filters = useSelector(FiltersSelectors.selectAllFilters);

  const [mapCenter, setMapCenter] = useState<[number, number]>([47.13, 39.42])

  const [applications, setApplications] = useState<ApplicationModel[]>([])

  useGetData(
    {
      url: '/api/v1/orders',
      dataFlag: true,
      params: { sort: sortBy, ...filters },
      withAuthToken: true,
      isEnabled: location.pathname === '/',
      onSuccess: (data) => {
        setApplications(data)
      }
    });

  if (!token) return <Navigate to={RouterPaths.LOGIN} replace />

  if (!user && isLoading) return <LoadingBlock />

  if (isError) return <Navigate to={RouterPaths.LOGIN} replace />

  return (
    <MainLayoutContext.Provider value={{ openOverlay, closeOverlay, applications, setApplications }}>
      <Notifications />
      <div className={cn(styles.overlay, { [styles.active]: isOverlayOpen })} />

      <div className={cn(styles.mainLayout, { [styles.withHeader]: showHeader })}>
        <YandexMap
          mapCenter={mapCenter}
          className={styles.map}
          applications={applications}
        />

        {showHeader && <div className={styles.header}>
          <Header
            handleButtonsStateToggle={handleButtonsStateToggle}
            buttonsState={headerButtonsState}
            isTablet={isTablet(windowSize)}
            isMobile={isMobile(windowSize)}
            applications={applications}
            setPoints={setMapCenter}
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
            <SearchOnMap
              className={cn(styles.searchWrapper, { [styles.searchOpen]: headerButtonsState.search })}
              applications={applications}
              setPoints={setMapCenter}
            />
          }
          <OrdersExport
            isOpen={headerButtonsState.exportOrder}
            closeExport={() => handleButtonsStateToggle("exportOrder", false)}
          />
        </div>}

        {!isTablet(windowSize)
          ? (
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
          )
          : (
            <div
              className={cn(styles.burger, { [styles.burgerOpen]: headerButtonsState.burger })}
              onClick={() => handleButtonsStateToggle("burger")}
            >
              <Sidebar isMobile onBurgerClose={() => handleButtonsStateToggle("burger")} />
            </div>
          )
        }

        {outlet &&
          <div className={cn(styles.content, {
            [styles.mainPage]: location.pathname === RouterPaths.MAIN,
            [styles.withHeader]: showHeader
          })}>
            {outlet}
          </div>
        }
      </div>
    </MainLayoutContext.Provider>
  )
}
