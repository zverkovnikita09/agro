import cn from 'classnames';
import styles from './MainLayout.module.scss'
import { useOutlet} from "react-router-dom";
import {Header} from "@widgets/Header";
import {Sidebar} from "@widgets/Sidebar";

interface MainLayoutProps {
  className?: string;
}

export const MainLayout = (props: MainLayoutProps) => {
  const {className} = props;
  const outlet = useOutlet();

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
