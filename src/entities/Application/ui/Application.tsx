import cn from 'classnames';
import styles from './Application.module.scss'
import { Title, TitleSize } from "@shared/ui/Title";
import { Text, TextColor, TextSize, TextWeight } from "@shared/ui/Text";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import Eye from '@images/eye.svg'
import { ApplicationIcons, ApplicationProperty } from "@shared/ui/ApplicationProperty";
import { CardContainer } from '@shared/ui/CardContainer';
import { TrailBlock } from "@shared/ui/TrailBlock";
import { ApplicationModel } from "@entities/Application/model/application.model";
import { Link } from "react-router-dom";
import { RouterPaths } from "@src/app/router";
import { useSendData } from '@shared/hook/useSendData';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType, addNotification } from '@entities/Notifications';
import { Role, UserSelectors } from '@entities/User';

interface ApplicationProps extends Partial<ApplicationModel> {
  className?: string;
  withMyResponse?: boolean;
}

export const Application = (props: ApplicationProps) => {
  const {
    className,
    id,
    crop,
    deadlines,
    tariff,
    distance,
    load_place_name,
    unload_place_name,
    order_number,
    created_at,
    volume,
    terminal_name,
    view_counter,
    withMyResponse = false
  } = props;

  const dispatch = useDispatch()

  const { handleSendData, isSending, isSuccess } = useSendData({
    url: '/api/v1/offers/create', withAuthToken: true, onSuccess: () => {
      dispatch(addNotification({ message: "Вы успешно откликнулись, скоро с вами свяжется логист", type: NotificationType.Success }))
    }
  })

  const userRole = useSelector(UserSelectors.selectUserRole);

  return (
    <CardContainer className={cn(styles.application, className)}>
      <div className={styles.application__content}>
        <div className={styles.application__column}>
          <div className={styles.titleHeading}>
            <Title size={TitleSize.APPLICATION_TITLE}>
              Заявка №{order_number}
            </Title>
            <Text as='p' size={TextSize.M} color={TextColor.GREY}>
              от: {created_at}
            </Text>
          </div>

          <div>
            <Text size={TextSize.M} weight={TextWeight.MEDIUM}>
              Сроки: &nbsp;
            </Text>
            <Text size={TextSize.M} color={TextColor.GREY}>
              {deadlines}
            </Text>
          </div>

        </div>
        <div className={styles.application__column}>
          <TrailBlock
            className={styles.trailBlock}
            destinationFrom={load_place_name ?? ''}
            destinationTo={unload_place_name ?? ''}
          />
          {terminal_name &&
            <div>
              <Text size={TextSize.M} weight={TextWeight.MEDIUM}>
                Грузополучатель/Терминал выгрузки: &nbsp;
              </Text>
              <Text size={TextSize.M} color={TextColor.GREY}>
                {terminal_name}
              </Text>
            </div>
          }
        </div>
        <div className={styles.application__column}>
          <div className={styles.application__cargoInfo}>
            <ApplicationProperty
              icon={ApplicationIcons.BOX}
            >
              {crop}
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.BOX_3D}
            >
              {volume}&nbsp;тонн
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.ROUTING}
            >
              {distance}&nbsp;км
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.CARD_COIN}
              additionalText='Без НДС'
            >
              {tariff}&nbsp;₽
            </ApplicationProperty>
          </div>
        </div>
      </div>
      <div className={styles.application__footer}>
        <div className={styles.application__info}>
          <div
            className={styles.viewCount}
          >
            <Eye width={18} height={18} />
            {view_counter}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            as={Link}
            to={`${RouterPaths.APPLICATION}/${id}`}
            className={styles.button}
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.S}
          >
            Подробнее
          </Button>
          {!isSuccess && userRole === Role.CLIENT && !withMyResponse &&
            <Button
              className={styles.button}
              theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
              size={ButtonSize.S}
              isLoading={isSending}
              onClick={() => handleSendData({ order_id: id })}
            >
              Откликнуться
            </Button>}
        </div>
      </div>
    </CardContainer>
  )
}
