import cn from 'classnames';
import styles from './SelectedApplication.module.scss'
import {CardContainer} from "@shared/ui/CardContainer";
import {Title} from "@shared/ui/Title";
import {CloseButton} from "@shared/ui/CloseButton";
import {useDispatch, useSelector} from "react-redux";
import {SelectedApplicationSelectors} from "@entities/SelectedApplication/model/SelectedApplication.selectors";
import {Text, TextColor, TextSize} from "@shared/ui/Text";
import {TrailBlock} from "@shared/ui/TrailBlock";
import {ApplicationIcons, ApplicationProperty} from "@shared/ui/ApplicationProperty";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {Link} from "react-router-dom";
import {RouterPaths} from "@src/app/router";
import Eye from "@images/eye.svg";
import {clearSelectedApplication} from "@entities/SelectedApplication/model/SelectedApplication.slice";

interface SelectedApplicationProps {
  className?: string;
}

export const SelectedApplication = (props: SelectedApplicationProps) => {
  const { className } = props;
  const dispatch = useDispatch();

  const selectedApplications =  useSelector(SelectedApplicationSelectors.selectSelectedApplication);

  if (!selectedApplications.length) return null;

  return (
    <CardContainer className={cn(styles.selectedApplication, className)}>
      <CloseButton className={styles.close} onClick={() => dispatch(clearSelectedApplication())}/>
      {selectedApplications.map((application) => (
        <div className={styles.applicationCard}>
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
              >
                Откликнуться
              </Button>
              <div className={styles.application__info}>
                <div
                  className={styles.viewCount}
                >
                  <Eye width={18} height={18}/>
                  36
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </CardContainer>
  )
}
