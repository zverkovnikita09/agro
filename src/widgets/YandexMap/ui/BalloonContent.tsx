import styles from './YandexMap.module.scss'
import { ApplicationModel } from "@entities/Application/model/application.model";
import { Title, TitleSize } from "@shared/ui/Title";
import { ViewCount } from "@shared/ui/ViewCount";
import { Text, TextColor, TextSize } from "@shared/ui/Text";
import { TrailBlock } from "@shared/ui/TrailBlock";
import { ApplicationIcons, ApplicationProperty } from "@shared/ui/ApplicationProperty";

interface BalloonContentProps {
  application: Partial<ApplicationModel>;
}
export const BalloonContent = ({ application }: BalloonContentProps) => {

  return (
    <div className={styles.balloonContent}>
      <div className={styles.balloonContentHeading}>
        <div className={styles.balloonContentHeadingRow}>
          <Title as="h4" size={TitleSize.XS}>Заявка № {application.order_number}</Title>
          <ViewCount views={36} />
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
      <div className={styles.balloonContentCargoInfo}>
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
  )
}