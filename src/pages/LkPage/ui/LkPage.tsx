import cn from 'classnames';
import styles from './LkPage.module.scss'
import {Button, ButtonSize, ButtonTheme} from '@shared/ui/Button';
import {Link, Navigate} from 'react-router-dom';
import {Title, TitleSize} from '@shared/ui/Title';
import {Text, TextColor, TextSize, TextWeight} from '@shared/ui/Text';
import {CardContainer} from '@shared/ui/CardContainer';
import {Tab, TabPanel, Tabs} from '@shared/ui/Tabs';
import {PersonalData} from './PersonalData';
import {UserPhoto} from '@shared/ui/UserPhoto';
import {RouterPaths} from '@src/app/router';
import {LoadingBlock} from '@shared/ui/LoadingBlock';
import {UserSelectors} from '@entities/User';
import {useContext, useLayoutEffect} from 'react';
import {MainLayoutContext} from '@shared/ui/MainLayout';
import {useSelector} from 'react-redux';
import {Select} from "@shared/ui/Select";
import {StatusBadge, StatusType} from "@shared/ui/StatusBadge";

interface LkPageProps {
  className?: string;
}

export const LkPage = (props: LkPageProps) => {
  const { className } = props;

  const { disableFilters } = useContext(MainLayoutContext)

  useLayoutEffect(() => {
    disableFilters(true)

    return () => disableFilters(false)
  }, [])

  const isLoading = useSelector(UserSelectors.selectIsUserDataLoading)
  const isError = useSelector(UserSelectors.selectIsUserDataError)

  const user = useSelector(UserSelectors.selectUserData)

  if (isLoading) return (
    <CardContainer className={cn(styles.lkPage, className)}>
      <LoadingBlock />
    </CardContainer>
  )

  if (isError) return <Navigate to={RouterPaths.LOGIN} replace />

  return (
    <CardContainer className={cn(styles.lkPage, className)}>
      <div className={styles.heading}>
        <UserPhoto image={user?.files?.find((file) => file.type === 'Аватар')?.path_url ?? ''} />
        <div className={styles.headingInfo}>
          <Title
            as='h3'
            size={TitleSize.S}
            className={styles.headingInfoTitle}
          >
            {user?.name || user?.phone_number}
          </Title>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>ИНН</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>{user?.inn || "Не указано"}</Text>
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>ОГРН</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>{user?.ogrn || "Не указано"}</Text>
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>Основной ОКВЭД</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>{user?.okved || "Не указано"}</Text>
          </div>
        </div>
        <Button
          as={Link}
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.editButton}
          to={RouterPaths.LK_EDIT}
        >
          {user?.type ? 'Редактировать профиль' : 'Заполнить профиль'}
        </Button>
      </div>
      <Tabs saveInParams>
        <div className={styles.tabsHeading}>
          <Tab value={0}>Личные данные</Tab>
          <Tab value={1}>Документы</Tab>
        </div>
        <TabPanel value={0}>
          {user &&
            <PersonalData user={user} files={user?.files}/>
          }
        </TabPanel>
        <TabPanel value={1}>
          <Tabs>
            <div className={styles.tabsHeading}>
              <Tab value={0}>Все</Tab>
              <Tab value={1}>Договора</Tab>
              <Tab value={2}>Заявки</Tab>
              <Tab value={3}>Акты</Tab>
              <Select
                className={styles.documentsSort}
                togglerClassName={styles.selectToggler}
                options={['ba']}
                value={'ba'}
                setValue={()=>{}}
              />

            </div>
            <TabPanel value={0}>
              <CardContainer>
                <div>
                  <Text>Договор №9</Text>
                  <Text>На перевозку пшеницы 4-класса. Ростов-на-Дону - Адыгея</Text>
                </div>
                <div className={styles.right}>
                  <StatusBadge status={StatusType.INACTIVE}>
                    Не подписан
                  </StatusBadge>
                  <Button
                    theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
                    size={ButtonSize.S}
                  >
                    Подписать
                  </Button>
                </div>
              </CardContainer>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </CardContainer>
  )
}
