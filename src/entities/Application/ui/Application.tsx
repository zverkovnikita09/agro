import cn from 'classnames';
import styles from './Application.module.scss'
import {Title, TitleSize} from "@shared/ui/Title";
import {Text, TextColor, TextSize} from "@shared/ui/Text";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {StatusBadge, StatusType} from "@shared/ui/StatusBadge";
import Eye from '@images/eye.svg'
import {ApplicationIcons, ApplicationProperty} from "@shared/ui/ApplicationProperty";

interface ApplicationProps {
  className?: string;
  id: number
}

export const Application = (props: ApplicationProps) => {
  const {className, id} = props;

  return (
    <div className={cn(styles.application, className)}>
      <div className={styles.application__content}>
        <div className={styles.application__column}>
          <Title size={TitleSize.APPLICATION_TITLE}>
            Заявка №{id}
          </Title>
          <Text as='p' size={TextSize.S} color={TextColor.GREY}>
            от: 06.03.2024
          </Text>

          <div>
            <Text size={TextSize.S}>
              Сроки: &nbsp;
            </Text>
            <Text size={TextSize.S} color={TextColor.GREY}>
              06.03.2024-05.15.2024
            </Text>
          </div>

        </div>
        <div className={styles.application__column}>
          <div>
            <Text size={TextSize.S} >
              Заказчик: &nbsp;
            </Text>
            <Text size={TextSize.S} color={TextColor.GREY}>
              ООО “Агротехервис”
            </Text>
          </div>
          <div className={styles.application__trail}>
            <div className={styles.application__trailItem}>
              Ростовская обл., р-н Верхнедонский, п. Суходольный
            </div>
            <div className={styles.application__trailItem}>
              Московская обл., г. Москва
            </div>
          </div>
        </div>
        <div className={styles.application__column}>
          <div className={styles.application__cargoInfo}>
            <ApplicationProperty
              icon={ApplicationIcons.BOX}
            >
              Пшеница
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.CARD_COIN}
              additionalText='Без НДС'
            >
              1500 ₽
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.ROUTING}
            >
              1800 км
            </ApplicationProperty>
            <ApplicationProperty
              icon={ApplicationIcons.BOX_3D}
            >
              10 тонн
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
    </div>
  )
}
