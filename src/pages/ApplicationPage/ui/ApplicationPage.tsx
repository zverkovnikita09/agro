import cn from 'classnames';
import styles from './ApplicationPage.module.scss'
import { Title, TitleSize } from "@shared/ui/Title";
import { Text, TextColor, TextSize, TextWeight } from "@shared/ui/Text";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { CardContainer } from "@shared/ui/CardContainer";
import { TrailBlock } from "@shared/ui/TrailBlock";
import ArrowLeft from "@images/arrow-left.svg"
import {
  ApplicationIconColor,
  ApplicationIcons,
  ApplicationProperty,
  TextPosition
} from "@shared/ui/ApplicationProperty";
import { BackButton } from "@shared/ui/BackButton";
import { RouterPaths } from "@src/app/router";
import { useParams } from "react-router-dom";
import { RadialInfo } from "@shared/ui/RadialInfo";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useGetData } from "@shared/hook/useGetData";
import { ApplicationModel } from "@entities/Application/model/application.model";
import { useContext, useLayoutEffect } from 'react';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useSendData } from '@shared/hook/useSendData';
import { useDispatch } from 'react-redux';
import { NotificationType, addNotification } from '@entities/Notifications';

interface ApplicationPageProps {
  className?: string;
}

export const ApplicationPage = (props: ApplicationPageProps) => {
  const { className } = props;

  const { id } = useParams();

  const { data: applicationInfo, isError, isLoading } = useGetData<ApplicationModel>({ url: `/api/v1/orders/${id}`, dataFlag: true })

  const { disableFilters } = useContext(MainLayoutContext)

  useLayoutEffect(() => {
    disableFilters(true)

    return () => disableFilters(false)
  }, [])

  const {
    order_number,
    start_order_at,
    end_order_at,
    crop,
    description,
    approach,
    cargo_price,
    cargo_shortage_rate,
    clarification_of_the_weekend,
    contact_name,
    contact_phone,
    daily_load_rate,
    deadlines,
    distance,
    exporter_inn,
    exporter_name,
    height_limit,
    is_overload,
    load_method,
    load_place_name,
    load_types,
    loader_power,
    nds_percent,
    outage_begin,
    outage_price,
    scale_length,
    tariff,
    load_place,
    terminal_name,
    timeslot,
    tolerance_to_the_norm,
    unit_of_measurement_for_cargo_shortage_rate,
    unload_place_name,
    volume,
    work_time,
    is_full_charter,
    unload_methods,
    created_at
  } = applicationInfo ?? {}

  const tariffWithNds = tariff && nds_percent && Math.ceil(tariff * nds_percent / 100 + tariff);

  const dispatch = useDispatch()

  const { handleSendData, isSending } = useSendData({
    url: '/api/v1/offers/create', withAuthToken: true, onSuccess: () => {
      dispatch(addNotification({ message: "Вы успешно откликнулись, скоро с вами свяжется логист", type: NotificationType.Success }))
    }
  })

  if (isLoading) return <CardContainer className={styles.loadBlock}><LoadingBlock /></CardContainer>

  // if (isError) return <CardContainer className={styles.loadBlock}><LoadingBlock /></CardContainer>

  return (
    <div className={cn(styles.applicationPage, className)}>
      <div className={styles.heading}>
        <BackButton>
          <ArrowLeft width={24} height={24} />
        </BackButton>
        <Title size={TitleSize.S}>
          Заявка №{order_number}
        </Title>
        <Text as='p' size={TextSize.L} color={TextColor.GREY}>
          от: {created_at}
        </Text>
        <Button
          className={styles.headingButton}
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
          isLoading={isSending}
          onClick={() => handleSendData({ order_id: id })}
        >
          Откликнуться
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.clientInfo}>
            <div>
              <Text size={TextSize.XL} weight={TextWeight.SEMI_BOLD}>
                Сроки: &nbsp;
              </Text>
              <Text size={TextSize.L} color={TextColor.GREY}>
                {start_order_at}-{end_order_at}
              </Text>
            </div>
          </div>
          <div className={styles.loadInfo}>
            {daily_load_rate && <div className={styles.loadInfo__item}>
              <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Норма:</Text>
              <Text size={TextSize.M} weight={TextWeight.MEDIUM}>{daily_load_rate} т <span className={styles.loadLimit}>/ день</span></Text>
            </div>}
            {loader_power && <div className={styles.loadInfo__item}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>Не более:</Text>
              <Text as="p" size={TextSize.M} weight={TextWeight.MEDIUM}>{loader_power} авто <span className={styles.loadLimit}>/ день</span></Text>
            </div>}
          </div>
        </div>
        <div className={cn(styles.cardContainer, styles.routesContainer)}>
          <Title as="h2" size={TitleSize.APPLICATION_TITLE} className={styles.routesTitle}>Маршрут</Title>
          <div className={cn(styles.infoGrid, styles.trail)}>
            {load_place_name && unload_place_name &&
              <TrailBlock
                destinationFrom={load_place_name}
                destinationTo={unload_place_name}
              />
            }
            <div className={styles.trailInfo}>
              {terminal_name &&
                <div className={styles.trailInfo__item}>
                  <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Грузополучатель/Терминал выгрузки</Text>
                  <Text size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>{terminal_name}</Text>
                </div>
              }
              <div className={styles.trailInfoRow}>
                {exporter_name &&
                  <div className={styles.trailInfo__item}>
                    <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Экспортер:</Text>
                    <Text size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>{exporter_name}</Text>
                  </div>
                }
                {
                  timeslot &&
                  <div className={styles.trailInfo__item}>
                    <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Таймслот:</Text>
                    <Text size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>{timeslot}</Text>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cargoInfo}>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.BOX}
            iconColor={ApplicationIconColor.ACCENT}
          >
            {crop}
          </ApplicationProperty>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.BOX_3D}
            iconColor={ApplicationIconColor.ACCENT}
          >
            {volume} тонн
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
            {distance} км
          </ApplicationProperty>
          <ApplicationProperty
            className={styles.cargoInfo__item}
            iconSize={26}
            icon={ApplicationIcons.CARD_COIN}
            iconColor={ApplicationIconColor.ACCENT}
            textPosition={TextPosition.COLUMN}
            additionalText={tariffWithNds ? `${tariffWithNds} ₽ С НДС` : undefined}
            additionalTextSize={TextSize.M}
            additionalTextColor={TextColor.GREY}
            additionalTextWeight={TextWeight.MEDIUM}
          >
            {tariff} ₽ Без НДС
          </ApplicationProperty>
        </div>
        <CardContainer className={styles.cardContainer} titleName='Детали погрузки'>
          <div className={cn(styles.infoGrid, styles.detailsGrid)}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Тип транспорта</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>
                {load_types?.map(type => (type as unknown as { title: string }).title).join(", ")}
              </Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Способ погрузки</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{load_method}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Возможность перегруза</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{is_overload ? 'Да' : 'Нет'}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Длина весов</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{scale_length} м</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Ограничения по
                высоте</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{height_limit} м</Text>
            </div>
            {tolerance_to_the_norm &&
              <div className={styles.infoItem}>
                <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Допуск к норме</Text>
                <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{tolerance_to_the_norm} %</Text>
              </div>
            }
          </div>
        </CardContainer>
        {!!outage_begin && (
          <CardContainer className={styles.cardContainer} titleName='Простой'>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Начало периода простоя</Text>
                <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>
                  {outage_begin === 2 ? "Со" : "C"} {outage_begin}-х суток
                </Text>
              </div>
              {outage_price &&
                <div className={styles.infoItem}>
                  <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Стоимость простоя</Text>
                  <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{outage_price} ₽ <span className={styles.loadLimit}>/ Сутки</span></Text>
                </div>
              }
            </div>
          </CardContainer>
        )}
        <CardContainer className={styles.cardContainer} titleName='Информация'>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Контактное лицо</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{contact_name}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Номер телефона</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{contact_phone}</Text>
            </div>
          </div>
          {description &&
            <div className={styles.note}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Примечание</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{description}</Text>
            </div>
          }
        </CardContainer>
        <CardContainer className={styles.cardContainer} titleName='Дополнительные параметры'>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Норма недостачи груза</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{cargo_shortage_rate ? `${cargo_shortage_rate} ${unit_of_measurement_for_cargo_shortage_rate}` : "Не указано"}</Text>
            </div>
            {/* <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Норма недостачи груза в килограммах</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{cargo_shortage_rate} кг</Text>
            </div> */}
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Стоимость груза</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{cargo_price ? `${cargo_price} ₽` : "Не указано"} </Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Место погрузки</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{load_place || "Не указано"}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Подъезд</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{approach || "Не указано"}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Тип выгрузки</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{unload_methods?.length ? unload_methods?.map(type => (type as unknown as { title: string }).title).join(", ") : "Не указано"}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Время работы</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{work_time || "Не указано"}</Text>
            </div>
            <div className={styles.infoItem}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Хартия</Text>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{is_full_charter !== null ? is_full_charter ? "Полная" : "Не полная" : "Не указано"}</Text>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  )
}
