import { CardContainer } from '@shared/ui/CardContainer'
import styles from './LkPage.module.scss'
import { ApplicationIcons, ApplicationProperty } from '@shared/ui/ApplicationProperty'
import { ApplicationInfoItem } from '@shared/ui/ApplicationInfoItem'
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text'
import { User, UserFiles } from '@entities/User'
import { InfoBlock, InfoBlockIconColor, InfoBlockIcons } from "@shared/ui/InfoBlock";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Link } from 'react-router-dom'
import { RouterPaths } from '@src/app/router'
import { formatSnils } from "@shared/lib/formatingSnils";

interface PersonalData {
  user?: User
  files?: UserFiles[]
}

const invalidDocuments = ['Акт', 'Заявка', 'Договор', 'Аватар'];

export const PersonalData = ({ user, files }: PersonalData) => {
  if (!user?.type) return (
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
        to={`${RouterPaths.PROFILE_EDIT}/${user?.id}`}
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
            {user.series}
          </ApplicationInfoItem>}
          <ApplicationInfoItem title='Номер паспорта'>
            {user.number}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Код подразделения'>
            {user.department_code}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Дата выдачи'>
            {user.issue_date_at}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Кем выдан'>
            {user.department}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='СНИЛС'>
            {formatSnils(user.snils)}
          </ApplicationInfoItem>
        </div>
      </CardContainer>
      {
        !!(files?.filter((file) => !invalidDocuments.includes(file.type)).length) &&
        <CardContainer titleName='Документы'>
          <div className={styles.documents}>
            {
              files?.filter((file) => !invalidDocuments.includes(file.type)).map((file) => (
                <a href={file.path_url} target='_blank'>
                  <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
                    {file.type}
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
            {user.juridical_address}
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Фактический адрес'>
            {user.office_address}
          </ApplicationInfoItem>
          <div className={styles.note}>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Система
              налогооблажения</Text>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>{user.tax_system}</Text>
          </div>
          {user.type === "ООО" &&
            <div className={styles.note}>
              <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Директор</Text>
              <Text as="p" size={TextSize.L}
                weight={TextWeight.MEDIUM}>{user.director_surname + ` ${user.director_name}`}</Text>
            </div>
          }
        </div>
      </CardContainer>
    </div>
  )
}