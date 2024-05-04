import cn from 'classnames';
import styles from './LkPage.module.scss'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Link } from 'react-router-dom';
import { Title, TitleSize } from '@shared/ui/Title';
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text';
import { CardContainer } from '@shared/ui/CardContainer';
import { Tab, TabPanel, Tabs } from '@shared/ui/Tabs';
import { PersonalData } from './PersonalData';
import { UserPhoto } from '@shared/ui/UserPhoto';
import { RouterPaths } from '@src/app/router';
import { useGetData } from '@shared/hook/useGetData';
import { LoadingBlock } from '@shared/ui/LoadingBlock';
import { Role, UserInfo } from '@entities/User';
import { useContext, useLayoutEffect } from 'react';
import { MainLayoutContext } from '@shared/ui/MainLayout';

interface LkPageProps {
  className?: string;
}

export const LkPage = (props: LkPageProps) => {
  const { className } = props;

  const { isLoading, isSuccess, data } = useGetData<{
    user: {
      userinfo: UserInfo, roles?: [
        { slug: Role }
      ]
    }
  }>({ url: "/api/v1/user", withAuthToken: true, dataFlag: true })

  const { disableFilters } = useContext(MainLayoutContext)

  useLayoutEffect(() => {
    disableFilters(true)

    return () => disableFilters(false)
  }, [])

  if (!isSuccess) return (
    <CardContainer className={cn(styles.lkPage, className)}>
      <LoadingBlock />
    </CardContainer>
  )

  return (
    <CardContainer className={cn(styles.lkPage, className)}>
      <div className={styles.heading}>
        <UserPhoto />
        <div className={styles.headingInfo}>
          <Title
            as='h3'
            size={TitleSize.S}
            className={styles.headingInfoTitle}
          >
            ИП Федоров
          </Title>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>ИНН</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>7484668468</Text>
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>ОГРН</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>748468468468</Text>
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>Основной ОКВЭД</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>7484</Text>
          </div>
        </div>
        <Button
          as={Link}
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.editButton}
          to={RouterPaths.LK_EDIT}
        >
          Редактировать профиль
        </Button>
      </div>
      <Tabs>
        <div className={styles.tabsHeading}>
          <Tab value={0}>Личные данные</Tab>
        </div>
        <TabPanel value={0}>
          <PersonalData userInfo={data?.user.userinfo} />
        </TabPanel>
      </Tabs>
    </CardContainer>
  )
}
