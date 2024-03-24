import cn from 'classnames';
import styles from './Sidebar.module.scss'
import Logo from "@images/logo.svg";
import LogoIcon from "@images/logo-icon.svg";
import LogoText from "@images/logo-text.svg"
import {NavLink} from "react-router-dom";
import {RouterPaths} from "@src/app/router";
import UserSquare from '@images/user-square.svg';
import Global from '@images/global.svg';
import Archive from '@images/archive.svg';
import Truck from '@images/truck.svg';
import UserCircle from '@images/user-circle.svg'
import ArrowLeft from '@images/arrow-left.svg'
import {useLocalStorage} from "@shared/hook/useLocalStorage";
import {LSKeys} from "@shared/lib/globalVariables";
import {Button} from "@shared/ui/Button";
import {Text, TextWeight} from "@shared/ui/Text";

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
  const {className} = props;
  const [isExpanded, setIsExpanded] = useLocalStorage(LSKeys.SIDEBAR_STATE, true);

  const handleExpandClick = () => {
    setIsExpanded(!Boolean(isExpanded));
  }

  return (
    <div className={cn(styles.sidebar, {[styles.expandedSidebar]: isExpanded}, className)}>
      <div className={styles.logo}>
        <LogoIcon width={18} height={32} />
        <LogoText width={63} height={31} />
      </div>
      {/*<Logo width={85} height={32} className={styles.logo}/>*/}
      <div className={styles.sidebar__menu}>
        <NavLink
          className={({isActive}) => cn(styles.menu__link, {[styles.active]: isActive})}
          to={'/lk'}
        >
          <UserSquare width={20} height={20}/>
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Личный кабинет</Text>
        </NavLink>
        <NavLink
          className={({isActive}) => cn(styles.menu__link, {[styles.active]: isActive})}
          to={RouterPaths.MAIN}
        >
          <Global width={20} height={20}/>
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Заявки на карте</Text>
        </NavLink>
        <NavLink
          className={({isActive}) => cn(styles.menu__link, {[styles.active]: isActive})}
          to={RouterPaths.CHECKLIST}
        >
          <Archive width={20} height={20}/>
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Список заявок</Text>
        </NavLink>
        <NavLink
          className={({isActive}) => cn(styles.menu__link, {[styles.active]: isActive})}
          to={'/rays'}
        >
          <Truck width={20} height={20}/>
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Рейсы</Text>
        </NavLink>
      </div>
      <div className={styles.sidebarControl}>
        <Button className={styles.profileInfo}>
          <UserCircle width={24} height={24}/>
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>ИП “Транс-Агро”</Text>
        </Button>
        <ArrowLeft className={styles.expandBtn} width={24} height={24} onClick={handleExpandClick}/>
      </div>
    </div>
  )
}
