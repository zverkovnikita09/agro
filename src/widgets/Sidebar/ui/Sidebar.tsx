import cn from 'classnames';
import styles from './Sidebar.module.scss'
import LogoIcon from "@images/logo-icon.svg";
import LogoText from "@images/logo-text.svg"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RouterPaths } from "@src/app/router";
import UserSquare from '@images/user-square.svg';
import Global from '@images/global.svg';
import Archive from '@images/archive.svg';
import Truck from '@images/truck.svg';
import UserCircle from '@images/user-circle.svg';
import ArrowLeft from '@images/chevron-left.svg';
import Logout from '@images/logout.svg';
import { useLocalStorage } from "@shared/hook/useLocalStorage";
import { LSKeys } from "@shared/lib/globalVariables";
import { Button } from "@shared/ui/Button";
import { Text, TextWeight } from "@shared/ui/Text";
import { useRef, useState } from "react";
import { Dropdown } from "@shared/ui/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Role, UserSelectors, removeUserData, setToken } from "@entities/User";
import { CloseButton } from "@shared/ui/CloseButton";

interface SidebarProps {
  className?: string;
  onBurgerClose?: () => void;
  isMobile?: boolean;
}

export const Sidebar = (props: SidebarProps) => {
  const { className, onBurgerClose, isMobile } = props;
  const [isExpanded, setIsExpanded] = useLocalStorage(LSKeys.SIDEBAR_STATE, true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const [, setLSToken] = useLocalStorage(LSKeys.TOKEN);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setIsExpanded(!Boolean(isExpanded));
  }

  const toggleDropdown = () => {
    setIsExpanded(true);
    // TO FIX
    setTimeout(() => setIsDropdownOpen((prev) => !prev), isExpanded ? 0 : 150)
  }

  const logout = () => {
    setLSToken(null);
    dispatch(removeUserData());
    navigate('/login');
  }

  const userData = useSelector(UserSelectors.selectUserData)
  const userRole = useSelector(UserSelectors.selectUserRole);

  const sidebarProfileText = (): string => {
    if (userData?.userInfo) return userData.userInfo.name;
    if (userRole === Role.CLIENT) return "Пользователь"
    if (userRole === Role.LOGIST) return "Логист"
    return ""
  }

  return (
    <div className={cn(styles.sidebar, { [styles.expandedSidebar]: isExpanded || isMobile }, className)} onClick={e => e.stopPropagation()}>
      <div className={styles.logo}>
        <LogoIcon width={52} height={52} />
        <LogoText width={70} height={37} />
      </div>
      {isMobile &&
        <CloseButton className={styles.close} onClick={onBurgerClose} />
      }
      <div className={styles.sidebar__menu}>
        {userRole === Role.CLIENT &&
          <NavLink
            className={({ isActive }) => cn(styles.menu__link, { [styles.active]: isActive })}
            to={RouterPaths.LK}
          >
            <UserSquare width={20} height={20} />
            <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Личный кабинет</Text>
          </NavLink>}
        <NavLink
          className={({ isActive }) => cn(styles.menu__link, { [styles.active]: isActive })}
          to={RouterPaths.MAIN}
        >
          <Global width={20} height={20} />
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Заявки на карте</Text>
        </NavLink>
        <NavLink
          className={({ isActive }) => cn(styles.menu__link, { [styles.active]: isActive })}
          to={RouterPaths.CHECKLIST}
        >
          <Archive width={20} height={20} />
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Список заявок</Text>
        </NavLink>
        {/*  <NavLink
          className={({ isActive }) => cn(styles.menu__link, { [styles.active]: isActive })}
          to={'/rays'}
        >
          <Truck width={20} height={20} />
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>Рейсы</Text>
        </NavLink> */}
      </div>
      <div className={styles.sidebarControl}>
        <Button buttonRef={profileButtonRef} className={styles.profileInfo} onClick={toggleDropdown}>
          <UserCircle width={24} height={24} />
          <Text className={styles.linkText} weight={TextWeight.MEDIUM}>{sidebarProfileText()}</Text>
        </Button>
        {!isMobile &&
          <ArrowLeft className={styles.expandBtn} width={24} height={24} onClick={handleExpandClick} />
        }
        <Dropdown
          className={styles.profileInfo__dropdown}
          fullWidth
          targetRef={profileButtonRef}
          isOpen={isDropdownOpen}
          onClose={toggleDropdown}
          noBorder
        >
          {userRole === Role.CLIENT &&
            <Button as={Link} className={styles.profileItem} to={RouterPaths.LK} onClick={toggleDropdown}>
              <UserCircle width={24} height={24} /> {sidebarProfileText()}
            </Button>
          }
          <Button className={styles.profileItem} onClick={logout}>
            <Logout width={24} height={24} /> Выйти
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
