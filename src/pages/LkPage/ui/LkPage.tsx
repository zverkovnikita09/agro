import cn from 'classnames';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { StatusBadge, StatusType } from "@shared/ui/StatusBadge";
import { Link, Navigate, useParams } from 'react-router-dom';
import { Title, TitleSize } from '@shared/ui/Title';
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text';
import { CardContainer } from '@shared/ui/CardContainer';
import Hourglass from '@images/hourglass.svg';
import Check from '@images/check-broken.svg';
import Info from '@images/info-circle.svg';
import { Tab, TabPanel, Tabs } from '@shared/ui/Tabs';
import { PersonalData } from './PersonalData';
import { UserPhoto } from '@shared/ui/UserPhoto';
import { RouterPaths } from '@src/app/router';
import { LoadingBlock } from '@shared/ui/LoadingBlock';
import { ModerationStatuses, Role, User, UserSelectors } from '@entities/User';
import { useContext, useLayoutEffect, useMemo } from 'react';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useSelector } from 'react-redux';
import styles from './LkPage.module.scss'
import { DocsList } from "@features/DocsList";
import { useGetData } from "@shared/hook/useGetData";
import { NotFoundBlock } from "@shared/ui/NotFoundBlock";

interface LkPageProps {
  className?: string;
}

const userModerationStatus: Record<ModerationStatuses, StatusType> = {
  [ModerationStatuses.REJECTED]: StatusType.ACTIVE,
  [ModerationStatuses.PENDING]: StatusType.INACTIVE,
  [ModerationStatuses.APPROVED]: StatusType.COMPLETE,
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
  const userRole = useSelector(UserSelectors.selectUserRole);
  const userId = useSelector(UserSelectors.selectUserId);

  const { id: userParamId } = useParams();

  const isCurrentUser = userParamId === userId;

  const { data: counteragent, isLoading: isCounteragentLoading, isError: isCounteragentError } = useGetData<User>(
    {
      url: `/api/v1/counteragent/${userParamId}`,
      isEnabled: !!userId && !isCurrentUser,
      dataFlag: true,
      withAuthToken: true
    })

  const userData = useMemo(() => {
    return isCurrentUser ? user : counteragent;
  }, [counteragent, user, isCurrentUser])

  /** Проверка на type, потому что при незаполненном профиле приходит статус approved */
  const isShowDocumentsTab = isCurrentUser && user?.type && userData?.moderation_status === ModerationStatuses.APPROVED;

  /**
   * TODO поправить для логиста
   */
  const isEditingAllowed = useMemo(() => {
    if (isCurrentUser) return true;
    if (userRole === Role.LOGIST) return true;
    return false;
  }, [])

  if (isLoading || isCounteragentLoading || isCounteragentError) return (
    <CardContainer className={cn(styles.lkPage, className)}>
      <LoadingBlock />
    </CardContainer>
  )

  if (isError) return <Navigate to={RouterPaths.LOGIN} replace />

  return (
    <CardContainer className={cn(styles.lkPage, className)}>
      <div className={styles.heading}>
        <UserPhoto image={userData?.files?.find((file) => file.type === 'Аватар')?.path_url ?? ''} />
        <div className={styles.headingInfo}>
          <div className={styles.headingInfoTitle}>
            <Title
              as='h3'
              size={TitleSize.S}
            >
              {userData?.short_name || userData?.phone_number}
            </Title>
            {user?.type && userData?.moderation_status &&
              <StatusBadge status={userModerationStatus[userData.moderation_status]} className={styles.moderationStatus}>
                {userData.moderation_status === ModerationStatuses.APPROVED && (
                  <>
                    <Check width={14} height={14} />
                    Профиль подтвержден
                  </>
                )}
                {userData.moderation_status === ModerationStatuses.PENDING && (
                  <>
                    <Hourglass width={14} height={14} />
                    Профиль на модерации
                  </>
                )}
                {userData.moderation_status === ModerationStatuses.REJECTED && (
                  <>
                    <Info width={14} height={14} />
                    Профиль не подтвержден
                  </>
                )}
              </StatusBadge>
            }
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>ИНН</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>{userData?.cinn || "Не указано"}</Text>
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>ОГРН</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>{userData?.ogrn || "Не указано"}</Text>
          </div>
          <div className={styles.headingInfoItem}>
            <Text weight={TextWeight.BOLD} size={TextSize.L}>Основной ОКВЭД</Text>
            <Text color={TextColor.GREY} size={TextSize.L}>{userData?.okved || "Не указано"}</Text>
          </div>
          {
            userData?.type === "ООО" &&
            <div className={styles.headingInfoItem}>
              <Text weight={TextWeight.BOLD} size={TextSize.L}>КПП</Text>
              <Text color={TextColor.GREY} size={TextSize.L}>{userData?.kpp || "Не указано"}</Text>
            </div>
          }
        </div>
        {isEditingAllowed && userData?.moderation_status !== ModerationStatuses.PENDING &&
          <Button
            as={Link}
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.S}
            className={styles.editButton}
            to={`${RouterPaths.PROFILE_EDIT}/${userId}`}
          >
            {userData?.type ? 'Редактировать профиль' : 'Заполнить профиль'}
          </Button>
        }
      </div>
      {userData?.moderation_status !== ModerationStatuses.PENDING ?
        <Tabs saveInParams>
          <div className={styles.tabsHeading}>
            <Tab value={0}>Личные данные</Tab>
            {isShowDocumentsTab && <Tab value={1}>Документы</Tab>}
          </div>
          <TabPanel value={0}>
            {userData &&
              <PersonalData user={userData} files={userData?.files} />
            }
          </TabPanel>
          {isShowDocumentsTab &&
            <TabPanel value={1}>
              <DocsList />
            </TabPanel>
          }
        </Tabs> :
        <NotFoundBlock
          Icon={Hourglass}
          title='Ваш профиль проходит модерацию'
          additionalText='Данные скоро появятся в личном кабинете'
        />
      }
    </CardContainer>
  )
}
