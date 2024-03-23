import cn from 'classnames';
import styles from './Sidebar.module.scss'
import Logo from "@images/logo.svg";
import {Link, NavLink, useParams} from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
  const { className } = props;
  const currentRoute = useParams();

  console.log(currentRoute)
  return (
    <div className={cn(styles.sidebar, styles.expandedSidebar, className)}>
      <Logo width={85} height={32} className={styles.logo}/>
      <div className={styles.sidebar__menu}>
        <NavLink className={styles.menu__link} to={'/'}>Личный кабинет</NavLink>
        <NavLink className={styles.menu__link} to={'/'}>Заявки на карте</NavLink>
        <NavLink className={cn(styles.menu__link, styles.active)} to={'/check-list'}>Список заявок</NavLink>
        <NavLink className={styles.menu__link} to={'/'}>Рейсу</NavLink>
      </div>
    </div>
  )
}
