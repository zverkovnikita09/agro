import cn from "classnames"
import { useCallback, useEffect } from "react"
import { CardContainer } from "@shared/ui/CardContainer";
import { CloseButton } from "@shared/ui/CloseButton";
import { type Notification, NotificationType, removeNotification } from "@entities/Notifications";
import { useDispatch } from "react-redux";
import SuccessIcon from "@images/success-icon.svg"
import ErrorIcon from "@images/error-icon.svg"
import WarningIcon from "@images/message-icon.svg"
import { Text, TextSize, TextWeight } from "@shared/ui/Text";
import style from './NotificationstItem.module.scss'


interface NotificationsItemProps extends Notification {
  timeout?: number
}

export const NotificationsItem = ({ id, type, message, timeout }: NotificationsItemProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      dispatch(removeNotification(id));
    }, timeout);

    return () => clearTimeout(timeoutId)
  }, [])

  const notificationIcon = useCallback((notificationType: NotificationType): JSX.Element => {
    switch (notificationType) {
      case NotificationType.Error:
        return <ErrorIcon width={26} height={26} />;
      case NotificationType.Warning:
        return <WarningIcon width={26} height={26} />;
      case NotificationType.Success:
        return <SuccessIcon width={26} height={26} />;
      case NotificationType.Info:
        return <></>;
      default:
        const unknownNotification: never = notificationType;
        throw new Error(`Неизвестный тип оповещения ${unknownNotification}`);
    }
  }, []);

  return (
    <CardContainer className={cn(style.notificationsItem, style[type])}>
      <CloseButton tabIndex={-1} onClick={() => dispatch(removeNotification(id))} className={style.close} />
      <div className={style.iconWrapper}>
        {notificationIcon(type)}
      </div>
      <Text className={style.text} weight={TextWeight.MEDIUM}>
        {message}
      </Text>
    </CardContainer>
  )
}