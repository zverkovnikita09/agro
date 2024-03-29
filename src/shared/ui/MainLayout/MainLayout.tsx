import cn from 'classnames';
import styles from './MainLayout.module.scss'
import { Navigate, useNavigate, useOutlet } from "react-router-dom";
import { Header } from "@widgets/Header";
import { Sidebar } from "@widgets/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { UserSelectors } from "@entities/User";
import { RouterPaths } from "@src/app/router";
import { useGetData } from "@shared/hook/useGetData";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { setUser } from "@entities/User";
import { createContext, useState } from 'react';

interface MainLayoutContextProps {
  openOverlay: () => void;
  closeOverlay: () => void;
}

export const MainLayoutContext = createContext<MainLayoutContextProps>({ openOverlay: () => { }, closeOverlay: () => { } })

export const MainLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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
        <iframe className={styles.map}
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A092c91191bf318e7ef6c8d42a695041151c46080253a6e3101f230ae4bbe8988&amp;source=constructor"
          width="100%" height="100%" frameBorder="0" />

        <div className={styles.header}>
          <Header />
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
