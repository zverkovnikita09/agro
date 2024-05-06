import styles from './SelectedApplication.module.scss'
import { ApplicationModel } from "@entities/Application/model/application.model";
import { Title, TitleSize } from "@shared/ui/Title";
import { ViewCount } from "@shared/ui/ViewCount";
import { Text, TextColor, TextSize } from "@shared/ui/Text";
import { TrailBlock } from "@shared/ui/TrailBlock";
import { ApplicationIcons, ApplicationProperty } from "@shared/ui/ApplicationProperty";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Link } from "react-router-dom";
import { RouterPaths } from "@src/app/router";
import { useSendData } from '@shared/hook/useSendData';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType, addNotification } from '@entities/Notifications';
import { Role, UserSelectors } from '@entities/User';
import {useContext} from "react";
import {MainLayoutContext} from "@shared/ui/MainLayout";

interface ApplicationContentProps {
  application: Partial<ApplicationModel>;
}
export const ApplicationContent = ({ application }: ApplicationContentProps) => {
  const dispatch = useDispatch();

  const {setApplications} = useContext(MainLayoutContext);

  const { handleSendData, isSending, isSuccess } = useSendData({
    url: '/api/v1/offers/create', withAuthToken: true, onSuccess: () => {
      dispatch(addNotification({ message: "Вы успешно откликнулись, скоро с вами свяжется логист", type: NotificationType.Success }))
      setApplications(prev => prev.filter(item => item.id !== application.id));
    }
  })

  const userRole = useSelector(UserSelectors.selectUserRole);

  return (
    <div className={styles.applicationCard}>
      <div className={styles.heading}>
        <div className={styles.headingRow}>
          <Title as="h4" size={TitleSize.XS}>Заявка № {application.order_number}</Title>
          <ViewCount views={application?.view_counter ?? 0} />
        </div>
        <Text as='p' size={TextSize.M} color={TextColor.GREY}>
          от: {application.created_at}
        </Text>
      </div>
      <Text size={TextSize.M}>
        Сроки: {application.deadlines}
      </Text>
      <TrailBlock
        destinationFrom={application.load_place_name ?? ''}
        destinationTo={application.unload_place_name ?? ''}
      />
      <div className={styles.cargoInfo}>
        <ApplicationProperty
          icon={ApplicationIcons.BOX}
        >
          {application.crop}
        </ApplicationProperty>
        <ApplicationProperty
          icon={ApplicationIcons.BOX_3D}
        >
          {application.volume} тонн
        </ApplicationProperty>
        <ApplicationProperty
          icon={ApplicationIcons.ROUTING}
        >
          {application.distance} км
        </ApplicationProperty>
        <ApplicationProperty
          icon={ApplicationIcons.CARD_COIN}
          additionalText='Без НДС'
        >
          {application.tariff} ₽
        </ApplicationProperty>
      </div>
      <div className={styles.buttons}>
        <Button
          as={Link}
          to={`${RouterPaths.APPLICATION}/${application.id}`}
          className={styles.button}
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
        >
          Подробнее
        </Button>
        {!isSuccess && userRole === Role.CLIENT &&
          <Button
            className={styles.button}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.S}
            fullWidth
            isLoading={isSending}
            onClick={() => handleSendData({ order_id: application.id })}
          >
            Откликнуться
          </Button>}
      </div>
    </div>
  )
}