import cn from 'classnames';
import styles from './MainLayout.module.scss'
import {Navigate, useNavigate, useOutlet} from "react-router-dom";
import {Header} from "@widgets/Header";
import {Sidebar} from "@widgets/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {setUser, UserSelectors} from "@entities/User";
import {RouterPaths} from "@src/app/router";
import {useGetData} from "@shared/hook/useGetData";
import {LoadingBlock} from "@shared/ui/LoadingBlock";
import {createContext, useState} from 'react';
import {CardContainer} from "@shared/ui/CardContainer";
import {Button} from "@shared/ui/Button";
import {Text, TextColor, TextSize, TextWeight} from "@shared/ui/Text";
import {Accordion} from "@shared/ui/Accordion";
import {InputRange} from "@shared/ui/InputRange";
import {useForm} from "react-hook-form";
import {Filters} from "@widgets/Filters";
import {YandexMap} from "@widgets/YandexMap";

interface MainLayoutContextProps {
  openOverlay: () => void;
  closeOverlay: () => void;
}

export const MainLayoutContext = createContext<MainLayoutContextProps>({ openOverlay: () => { }, closeOverlay: () => { } })

export const MainLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const [isFiltersActive, setIsFiltersActive] = useState(false);

  const toggleFiltersOpen = () => {
    setIsFiltersActive((prev) => !prev);
  }

  const openOverlay = () => setIsOverlayOpen(true)
  const closeOverlay = () => setIsOverlayOpen(false)

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
    <MainLayoutContext.Provider value={{ openOverlay, closeOverlay }}>
      <div className={cn(styles.overlay, { [styles.active]: isOverlayOpen })} />
      <div className={styles.mainLayout}>
        <YandexMap className={styles.map} />

        <div className={styles.header}>
          <Header toggleFiltersOpen={toggleFiltersOpen} isFiltersOpen={isFiltersActive} />
          <Filters isOpen={isFiltersActive} closeFilters={() => setIsFiltersActive(false)} />
        </div>

        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        {outlet &&
          <div className={styles.content}>{outlet}</div>
        }
      </div>
    </MainLayoutContext.Provider>
  )
}
