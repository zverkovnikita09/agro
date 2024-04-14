import cn from 'classnames';
import styles from './MainLayout.module.scss'
import { Navigate, useNavigate, useOutlet } from "react-router-dom";
import { Header } from "@widgets/Header";
import { Sidebar } from "@widgets/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setUser, UserSelectors } from "@entities/User";
import { RouterPaths } from "@src/app/router";
import { useGetData } from "@shared/hook/useGetData";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { createContext, useState } from 'react';
import { Filters } from "@entities/Filters";
import { YandexMap } from "@widgets/YandexMap";
import { Notifications } from '@entities/Notifications';
import { SortBy } from "@entities/SortBy";

interface MainLayoutContextProps {
  openOverlay: () => void;
  closeOverlay: () => void;
  disableFilters: (status: boolean) => void;
}

export const MainLayoutContext = createContext<MainLayoutContextProps>({} as MainLayoutContextProps)

export const MainLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [isFiltersActive, setIsFiltersActive] = useState(false);

  const [isSortingActive, setIsSortingActive] = useState(false);

  const [isFiltersDisabled, setFiltersDisabled] = useState(false)

  const toggleFiltersOpen = () => {
    if (isSortingActive) setIsSortingActive(false)
    setIsFiltersActive((prev) => !prev);
  }

  const toggleSortingOpen = () => {
    if (isFiltersActive) setIsFiltersActive(false);
    setIsSortingActive((prev) => !prev);
  }

  const openOverlay = () => setIsOverlayOpen(true)
  const closeOverlay = () => setIsOverlayOpen(false)

  const disableFilters = (status: boolean) => {
    setFiltersDisabled(status)
  }

  const token = useSelector(UserSelectors.selectToken);
  const dispatch = useDispatch();

  const { isLoading } = useGetData({
    url: '/api/v1/user',
    withAuthToken: true,
    isEnabled: !!token,
    dataFlag: true,
    onSuccess: (user) => { dispatch(setUser(user)) },
    onError: () => navigate(RouterPaths.LOGIN),
  });

  if (!token) return <Navigate to={RouterPaths.LOGIN} replace={true} />

  if (isLoading) return <LoadingBlock />

  return (
    <MainLayoutContext.Provider value={{ openOverlay, closeOverlay, disableFilters }}>
      <Notifications />
      <div className={cn(styles.overlay, { [styles.active]: isOverlayOpen })} />

      <div className={styles.mainLayout}>
        <YandexMap className={styles.map} />

        <div className={styles.header}>
          <Header
            toggleFiltersOpen={toggleFiltersOpen}
            isFiltersOpen={isFiltersActive}
            toggleSortingOpen={toggleSortingOpen}
            isSortingOpen={isSortingActive}
            isFiltersDisabled={isFiltersDisabled}
          />
          <Filters
            isOpen={isFiltersActive}
            closeFilters={() => setIsFiltersActive(false)}
          />
          <SortBy
            isOpen={isSortingActive}
            closeSorting={() => setIsSortingActive(false)}
          />
        </div>

        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        {outlet &&
          <div className={styles.content}>
            {outlet}
          </div>
        }
      </div>
    </MainLayoutContext.Provider>
  )
}
