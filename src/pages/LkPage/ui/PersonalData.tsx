import { CardContainer } from '@shared/ui/CardContainer'
import styles from './LkPage.module.scss'
import { ApplicationIcons, ApplicationProperty } from '@shared/ui/ApplicationProperty'
import { ApplicationInfoItem } from '@shared/ui/ApplicationInfoItem'
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text'
import { UserInfo } from '@entities/User'

interface PersonalData {
  userInfo?: UserInfo
}

export const PersonalData = ({ userInfo }: PersonalData) => {
  if (!userInfo) return (
    <div className={styles.noInfoWrapper}>
      Профиль то заполни еблан
    </div>
  )

  return (
    <div className={styles.personalData}>
      <CardContainer titleName='Личные данные'>
        <div className={styles.passportData}>
          <ApplicationInfoItem title='Серия паспорта'>
            1234
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Номер паспорта'>
            345768
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Код подразделения'>
            613-012
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Дата выдачи'>
            28.09.2009
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Кем выдан'>
            ГУ МВД РОССИИ ПО РОСТОВСКОЙ ОБЛАСТИ
          </ApplicationInfoItem>
          <ApplicationInfoItem title='СНИЛС'>
            123456445643
          </ApplicationInfoItem>
        </div>
      </CardContainer>
      <CardContainer titleName='Документы'>
        <div className={styles.documents}>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              Реквизиты
            </ApplicationProperty>
          </a>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              ПСФЛ
            </ApplicationProperty>
          </a>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              ЕФС
            </ApplicationProperty>
          </a>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              Налоговая тайна
            </ApplicationProperty>
          </a>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              Патент
            </ApplicationProperty>
          </a>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              УСН
            </ApplicationProperty>
          </a>
          <a href="">
            <ApplicationProperty icon={ApplicationIcons.GALLERY} className={styles.documentItem}>
              НДС
            </ApplicationProperty>
          </a>
        </div>
      </CardContainer>
      <CardContainer titleName='Информация'>
        <div className={styles.information}>
          <ApplicationInfoItem title='Серия паспорта'>
            1234
          </ApplicationInfoItem>
          <ApplicationInfoItem title='Номер паспорта'>
            345768
          </ApplicationInfoItem>
          <div className={styles.note}>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM} color={TextColor.GREY}>Система налогооблажения</Text>
            <Text as="p" size={TextSize.L} weight={TextWeight.MEDIUM}>УСН (6%)</Text>
          </div>
        </div>
      </CardContainer>
    </div>
  )
}