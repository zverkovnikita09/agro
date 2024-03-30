import cn from 'classnames';
import styles from './ApplicationPage.module.scss'
import {Title, TitleSize} from "@shared/ui/Title";
import {Text, TextColor, TextSize, TextWeight} from "@shared/ui/Text";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {CardContainer} from "@shared/ui/CardContainer";
import {TrailBlock} from "@shared/ui/TrailBlock";
import ArrowLeft from "@images/arrow-left.svg"
import {
  ApplicationIconColor,
  ApplicationIcons,
  ApplicationProperty,
  TextPosition
} from "@shared/ui/ApplicationProperty";
import {BackButton} from "@shared/ui/BackButton";
import {RouterPaths} from "@src/app/router";
import {useParams} from "react-router-dom";
import {RadialInfo} from "@shared/ui/RadialInfo";

interface ApplicationPageProps {
  className?: string;
}

export const ApplicationPage = (props: ApplicationPageProps) => {
  const { className } = props;
  const { id } = useParams();
  return (
    <div className={cn(styles.applicationPage, className)}>
      <div className={styles.heading}>
        <BackButton defaultRoute={RouterPaths.CHECKLIST}>
          <ArrowLeft />
        </BackButton>
        <Title size={TitleSize.S}>
          Заявка №{id}
        </Title>
        <Text as='p' size={TextSize.L} color={TextColor.GREY}>
          от: 06.03.2024
        </Text>
        <Button
          className={styles.headingButton}
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
        >
          Откликнуться
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.clientInfo}>
            <div>
              <Text size={TextSize.XL} weight={TextWeight.SEMI_BOLD}>
                Заказчик: &nbsp;
              </Text>
              <Text size={TextSize.L} color={TextColor.GREY}>
                ООО “Агротехервис”
              </Text>
            </div>
            <div>
              <Text size={TextSize.XL} weight={TextWeight.SEMI_BOLD}>
                Сроки: &nbsp;
              </Text>
              <Text size={TextSize.L} color={TextColor.GREY}>
                06.03.2024-05.15.2024
              </Text>
            </div>
          </div>
          <div className={styles.loadInfo}>
            <div className={styles.loadInfo__item}>
              <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Норма:</Text>
              <Text size={TextSize.M} weight={TextWeight.MEDIUM}>500 т <span className={styles.loadLimit}>/ день</span></Text>
            </div>
            <div className={styles.loadInfo__item}>
              <Text as={"p"} size={TextSize.L} weight={TextWeight.MEDIUM}>Не более:</Text>
              <Text as={"p"} size={TextSize.M} weight={TextWeight.MEDIUM}>20 авто <span className={styles.loadLimit}>/ день</span></Text>
            </div>
          </div>
        </div>
        <CardContainer className={styles.cardContainer} titleName='Маршрут'>
          <div className={cn(styles.infoGrid, styles.trail)}>
            <TrailBlock
              destinationFrom={'Ростовская обл., р-н Верхнедонский, п. Суходольный'}
              destinationTo={'Московская обл., г. Москва'}
            />
            <div className={styles.trailInfo}>
              <div className={styles.trailInfo__item}>
                <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Таймслот:</Text>
                <Text size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>В общем доступе</Text>
              </div>
              <div className={styles.trailInfo__item}>
                <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Экспортер:</Text>
                <Text size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>ООО “Байкал-транс”</Text>
              </div>
            </div>
          </div>
        </CardContainer>
        <div className={styles.cargoInfo}>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.BOX}
            iconColor={ApplicationIconColor.ACCENT}
          >
            Пшеница
          </ApplicationProperty>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.BOX_3D}
            iconColor={ApplicationIconColor.ACCENT}
          >
            10 тонн
          </ApplicationProperty>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.ROUTING}
            iconColor={ApplicationIconColor.ACCENT}
            additionalText='~ 21 час'
            additionalTextSize={TextSize.L}
            additionalTextColor={TextColor.GREY}
            additionalTextWeight={TextWeight.MEDIUM}
          >
            1800 км
          </ApplicationProperty>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.CARD_COIN}
            iconColor={ApplicationIconColor.ACCENT}
            textPosition={TextPosition.COLUMN}
            additionalText='1900 ₽ С НДС'
            additionalTextSize={TextSize.M}
            additionalTextColor={TextColor.GREY}
            additionalTextWeight={TextWeight.MEDIUM}
          >
            1500 ₽ Без НДС
          </ApplicationProperty>
        </div>
        <CardContainer className={styles.cardContainer} titleName='Детали погрузки'>
          <div className={cn(styles.infoGrid, styles.detailsGrid)}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Тип транспорта</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Полуприцеп</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Способ погрузки</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Зерновая пушка</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Возможность перегруза</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Да</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Длина весов</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>18 м</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Ограничения по
                высоте</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>4 м</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Допуск к норме</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Да</Text>
            </div>
          </div>
        </CardContainer>
        <CardContainer className={styles.cardContainer} titleName='Простой'>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Начало периода простоя</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>С 1-х суток</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Стоимость простоя</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>1250 ₽ <span className={styles.loadLimit}>/ Сутки</span>
              </Text>
            </div>
          </div>
        </CardContainer>
        <CardContainer className={styles.cardContainer} titleName='Информация'>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Контактное лицо</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Станислав Олегович</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Номер телефона</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>+7 (909) 900-76-76</Text>
            </div>
          </div>
          <div className={styles.note}>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Примечание</Text>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Аванс на погрузке 50%  Анастасия +7 (918) 644-98-61, Олеся +7 (988) 464-83-41</Text>
          </div>
        </CardContainer>
        <CardContainer className={styles.cardContainer} titleName='Дополнительные параметры'>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Норма недостачи груза в процентах</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>12 %</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Норма недостачи груза в килограммах</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>1250 кг</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Стоимость груза</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>4250 ₽</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Мосто погрузки</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Закрытый ангар</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Подъезд</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Асфальт</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Тип выгрузки</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Самосвальная боковая</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Время работы</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Пн-Сб 8:00-19:00</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Хартия</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Полная</Text>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  )
}
