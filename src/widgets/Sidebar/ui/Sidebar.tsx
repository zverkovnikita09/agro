import cn from 'classnames';
import styles from './Sidebar.module.scss'
import Logo from "@images/logo.svg";
import {Link, NavLink} from "react-router-dom";
import {RouterPaths} from "@src/app/router";

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.sidebar, styles.expandedSidebar, className)}>
      <Logo width={85} height={32} className={styles.logo}/>
      <div className={styles.sidebar__menu}>
        <NavLink
          className={({ isActive }) => cn(styles.menu__link, {[styles.active]: isActive } )}  to={'/lk'}
        >
          Личный кабинет
        </NavLink>
        <NavLink className={({ isActive }) => cn(styles.menu__link, {[styles.active]: isActive })} to={RouterPaths.MAIN}>Заявки на карте</NavLink>
        <NavLink className={({ isActive }) => cn(styles.menu__link, {[styles.active]: isActive } )} to={RouterPaths.CHECKLIST}>Список заявок</NavLink>
        <NavLink className={({ isActive }) => cn(styles.menu__link, {[styles.active]: isActive } )} to={'/rays'}>Рейсы</NavLink>
      </div>
    </div>
  )
}
