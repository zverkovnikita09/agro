import cn from 'classnames';
import styles from './Sidebar.module.scss'
import Logo from "@images/logo.svg";

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.sidebar, styles.expandedSidebar, className)}>
      <Logo width={85} height={32} className={styles.logo}/>
    </div>
  )
}
