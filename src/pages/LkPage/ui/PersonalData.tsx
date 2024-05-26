import { CardContainer } from '@shared/ui/CardContainer'
import styles from './LkPage.module.scss'
import { ApplicationIcons, ApplicationProperty } from '@shared/ui/ApplicationProperty'
import { ApplicationInfoItem } from '@shared/ui/ApplicationInfoItem'
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text'
import { UserFiles, UserInfo } from '@entities/User'
import { InfoBlock, InfoBlockIconColor, InfoBlockIcons } from "@shared/ui/InfoBlock";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Link } from 'react-router-dom'
import { RouterPaths } from '@src/app/router'

interface PersonalData {
  userInfo?: UserInfo
  files?: UserFiles[]
}

export const PersonalData = ({ userInfo, files }: PersonalData) => {
  if (!userInfo?.type) return (
    <InfoBlock
      icon={InfoBlockIcons.EDIT}
      iconSize={46}
      iconColor={InfoBlockIconColor.GREY}
      titleText={'Профиль не заполнен'}
      additionalText={'Заполните личные данные профиля'}
      className={styles.noInfoWrapper}
    >
      <Button
        className={styles.infoButton}
        size={ButtonSize.SM}
        theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
        as={Link}
        to={RouterPaths.LK_EDIT}
      >
        Заполнить профиль
      </Button>
    </InfoBlock>
  )

  return (
    <div className={styles.personalData}>
      <CardContainer titleName='Личные данные'>
        <div className={styles.passportData}>
          {<ApplicationInfoItem title='Серия паспорта'>
            {userInfo.series}
          </ApplicationInfoItem>}
          <ApplicationInfoItem title='Номер паспорта'>
            {userInfo.number}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Код подразделения'>
            {userInfo.department_code}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Дата выдачи'>
            {userInfo.issue_date_at}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Кем выдан'>
            {userInfo.department}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='СНИЛС'>
            {userInfo.snils || "Не указано"}
          </ApplicationInfoItem>
        </div>
      </CardContainer>
      {
        !!(files?.filter((file) => file.fileType.title !== 'Аватар').length) &&
        <CardContainer titleName='Документы'>
          <div className={styles.documents}>
            {
              files?.filter((file) => file.fileType.title !== 'Аватар').map((file) => (
                <a href={file.path_url} target='_blank'>
                  <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
                    {file.fileType.title}
                  </ApplicationProperty>
                </a>
              ))
            }
          </div>
        </CardContainer>
      }
      <CardContainer titleName='Информация'>
        <div className={styles.information}>
          <ApplicationInfoItem title='Юридический адрес'>
            {userInfo.juridical_address}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Фактический адрес'>
            {userInfo.office_address}
          </ApplicationInfoItem>
          <div className={styles.note}>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Система налогооблажения</Text>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{userInfo.tax_system}</Text>
          </div>
        </div>
      </CardContainer>
    </div >
  )
}