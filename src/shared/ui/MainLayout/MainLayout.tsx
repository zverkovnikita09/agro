import cn from 'classnames';
import styles from './MainLayout.module.scss'
import {Navigate, useNavigate, useOutlet} from "react-router-dom";
import {Header} from "@widgets/Header";
import {Sidebar} from "@widgets/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {UserSelectors} from "@entities/User/model/User.selectors";
import {useEffect} from "react";
import {RouterPaths} from "@src/app/router";
import {useGetData} from "@shared/hook/useGetData";
import {LoadingBlock} from "@shared/ui/LoadingBlock";
import {setUser} from "@entities/User/model/User.slice";

interface MainLayoutProps {
  className?: string;
}

export const MainLayout = (props: MainLayoutProps) => {
  const {className} = props;
  const outlet = useOutlet();
  const navigate = useNavigate();

  const user = useSelector(UserSelectors.selectUserData);
  const token = useSelector(UserSelectors.selectToken);
  const dispatch = useDispatch();

  const {isLoading} = useGetData({
    url: '/api/v1/user',
    withAuthToken: true,
    isEnabled: !!token,
    dataFlag: true,
    onSuccess: (user) => {dispatch(setUser(user))},
    onError: () => navigate(RouterPaths.LOGIN),
  });

  if (!token) return <Navigate to={RouterPaths.LOGIN} replace={true}/>

  if (isLoading) return <LoadingBlock />

  return (
    <div className={cn(styles.mainLayout, className)}>
      <iframe className={styles.map}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A092c91191bf318e7ef6c8d42a695041151c46080253a6e3101f230ae4bbe8988&amp;source=constructor"
              width="100%" height="100%" frameBorder="0"/>

      <div className={styles.header}>
        <Header/>
      </div>

      <div className={styles.sidebar}>
        <Sidebar/>
      </div>

      {outlet &&
        <div className={styles.content}>{outlet}</div>
      }
    </div>
  )
}
