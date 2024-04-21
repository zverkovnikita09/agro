import styles from './SelectedApplication.module.scss'
import {ApplicationModel} from "@entities/Application/model/application.model";
import {Title, TitleSize} from "@shared/ui/Title";
import {ViewCount} from "@shared/ui/ViewCount";
import {Text, TextColor, TextSize} from "@shared/ui/Text";
import {TrailBlock} from "@shared/ui/TrailBlock";
import {ApplicationIcons, ApplicationProperty} from "@shared/ui/ApplicationProperty";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {Link} from "react-router-dom";
import {RouterPaths} from "@src/app/router";

interface ApplicationContentProps {
  application: Partial<ApplicationModel>;
  withButtons?: boolean;
}
export const ApplicationContent = ({application, withButtons}: ApplicationContentProps) => {

  return (
    <div className={styles.applicationCard}>
      <div className={styles.heading}>
        <div className={styles.headingRow}>
          <Title as="h4" size={TitleSize.XS}>Заявка № {application.order_number}</Title>
          <ViewCount views={36}/>
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
      {withButtons &&
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
          <Button
            className={styles.button}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.S}
            fullWidth
          >
            Откликнуться
          </Button>
        </div>
      }
    </div>
  )
}