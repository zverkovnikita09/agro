import cn from 'classnames';
import styles from './Application.module.scss'
import {Title, TitleSize} from "@shared/ui/Title";
import {Text, TextColor, TextSize} from "@shared/ui/Text";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {StatusBadge, StatusType} from "@shared/ui/StatusBadge";
import Eye from '@images/eye.svg'
import {ApplicationIcons, ApplicationProperty} from "@shared/ui/ApplicationProperty";
import {CardContainer} from '@shared/ui/CardContainer';
import {TrailBlock} from "@shared/ui/TrailBlock";
import {ApplicationModel} from "@entities/Application/model/application.model";
import {Link} from "react-router-dom";
import {RouterPaths} from "@src/app/router";

interface ApplicationProps extends Partial<ApplicationModel>{
  className?: string;
  status: StatusType;
}

export const Application = (props: ApplicationProps) => {
  const {
    className,
    id,
    status,
    crop,
    deadlines,
    tariff,
    distance,
    load_place_name,
    unload_place_name,
    order_number,
    created_at,
    volume
  } = props;

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
            <Text size={TextSize.M}>
              Сроки: &nbsp;
            </Text>
            <Text size={TextSize.M} color={TextColor.GREY}>
              {deadlines}
            </Text>
          </div>

        </div>
        <div className={styles.application__column}>
          {/*<div>*/}
          {/*  <Text size={TextSize.S} >*/}
          {/*    Заказчик: &nbsp;*/}
          {/*  </Text>*/}
          {/*  <Text size={TextSize.S} color={TextColor.GREY}>*/}
          {/*    ООО “Агротехервис”*/}
          {/*  </Text>*/}
          {/*</div>*/}
          <TrailBlock
            destinationFrom={load_place_name ?? ''}
            destinationTo={unload_place_name ?? ''}
          />
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
              {volume} тонн
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.ROUTING}
            >
              {distance} км
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.CARD_COIN}
              additionalText='Без НДС'
            >
              {tariff} ₽
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
            36
          </div>
          <StatusBadge status={StatusType.ACTIVE} />
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
          <Button
            className={styles.button}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.S}
          >
            Откликнуться
          </Button>
        </div>
      </div>
    </CardContainer>
  )
}
