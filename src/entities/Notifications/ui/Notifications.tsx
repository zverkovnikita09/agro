import { useSelector } from 'react-redux'
import style from './Notifications.module.scss'
import { NotificationsItem } from './NotificationsItem/NotificationsItem'
import { NotificationsSelectors } from '../model/Notifications.selectors'

interface NotificationsProps {
  timeout?: number
}

export const Notifications = ({ timeout = 3000 }: NotificationsProps) => {
  const notifications = useSelector(NotificationsSelectors.selectAllNotifications);

  if (!notifications.length) {
    return null
  }

  return (
    <div className={style.notifications}>
      {notifications.map((notification) => (
        <NotificationsItem {...notification}
          timeout={notification.timeout ?? timeout}
          key={notification.id}
        />
      ))}
    </div>
  )
}