import cn from 'classnames';
import styles from './OrdersExport.module.scss'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { CardContainer } from '@shared/ui/CardContainer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { InfoBlockIconColor } from '@shared/ui/InfoBlock';
import { useGetData } from '@shared/hook/useGetData';
import { addNotification, NotificationType } from '@entities/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { FiltersSelectors } from '@entities/Filters';

interface OrdersExportProps {
  className?: string;
  isOpen: boolean;
  closeExport: () => void;
}

export const OrdersExport = (props: OrdersExportProps) => {
  const { className, isOpen, closeExport } = props;

  const allFilters = useSelector(FiltersSelectors.selectAllFilters);

  const location = useLocation();

  useEffect(() => {
    closeExport();
  }, [location]);

  const dispatch = useDispatch();

  const onSuccess = () => {
    addNotification({ message: "Выбранные заявки успешно выгружены", type: NotificationType.Success });
    closeExport()
  };

  const onError = (error: any) => {
    dispatch(addNotification({ message: error.message, type: NotificationType.Error }));
    closeExport()
  }

  const { refetch: exportPublic } = useGetData({
    url: "/api/v1/orders/export/public",
    isEnabled: false,
    params: { ...allFilters },
    withAuthToken: true,
    onSuccess: onSuccess,
    onError: onError
  });

  const { refetch: exportLocal } = useGetData({
    url: "/api/v1/orders/export/local",
    isEnabled: false,
    params: { ...allFilters },
    withAuthToken: true,
    onSuccess: onSuccess,
    onError: onError,
  });

  if (!isOpen) return null

  return (
    <CardContainer className={cn(styles.ordersExport, className)}>
      <Button
        className={cn(styles.button)}
        size={ButtonSize.S}
        withConfirm
        alertPopupProps={{
          confirmText: "Вы действительно хотите выгрузить заявки?",
          additionalText: "Все заявки по выбранным фильтрам будут выгружены во внешние группы в WhatsApp",
          iconColor: InfoBlockIconColor.ACCENT,
          buttonThemes: {
            confirm: ButtonTheme.OUTLINE
          }
        }}
        onClick={exportPublic}
        fullWidth
      >
        Внешние
      </Button>
      <Button
        size={ButtonSize.PRIMARY}
        className={cn(styles.button)}
        onClick={exportLocal}
        fullWidth
        withConfirm
        alertPopupProps={{
          confirmText: "Вы действительно хотите выгрузить заявки?",
          additionalText: "Все заявки по выбранным фильтрам будут выгружены во внутренние группы в WhatsApp",
          iconColor: InfoBlockIconColor.ACCENT,
          buttonThemes: {
            confirm: ButtonTheme.OUTLINE
          }
        }}
      >
        Внутренние
      </Button>
    </CardContainer>
  )
}
