import { ApplicationModel } from '@entities/Application/model/application.model';
import styles from './YandexMap.module.scss'
import { Text, TextColor, TextSize, TextWeight } from "@shared/ui/Text";
import { CardContainer } from '@shared/ui/CardContainer';
import triangle from "@images/triangle.png"
import { Title } from '@shared/ui/Title';
import { TrailBlock } from '@shared/ui/TrailBlock';
import { ApplicationIcons, ApplicationProperty } from '@shared/ui/ApplicationProperty';

interface BalloonContentProps {
  application: ApplicationModel
}

export const BalloonContent = ({ application }: BalloonContentProps) => {
  return (
    <CardContainer className={styles.balloon}>
      <img src={triangle} className={styles.ballonTriangle} alt="Указатель" />
      <div className={styles.balloonContent}>
        <Title>Заявка № {application.order_number}</Title>
        <Text as='p' size={TextSize.M} color={TextColor.GREY}>
          от: {application.created_at}
        </Text>
        <Text size={TextSize.M}>
          Сроки: {application.deadlines}
        </Text>
        <TrailBlock
          destinationFrom={application.load_place_name ?? ''}
          destinationTo={application.unload_place_name ?? ''}
        />
        <div className={styles.application__cargoInfo}>
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
      </div>
    </CardContainer>
  )
}