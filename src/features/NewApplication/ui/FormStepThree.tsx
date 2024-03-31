import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { TextArea } from '@shared/ui/TextArea'
import BurgerIcon from '@images/two-lines-burger.svg'
import { Select } from '@shared/ui/Select'

interface FormStepThreeProps {
  prevStep: () => void
  toAdditional: () => void
}

export const FormStepThree = (props: FormStepThreeProps) => {
  const { prevStep, toAdditional } = props;
  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Простой
        </Text>
        <div className={styles.inputsRow}>
          <Select placeholder='Начало периода простоя' options={[]} value={''} setValue={() => { }} />
          <Input placeholder='Стоимость простоя ₽/в сутки' />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Информация
        </Text>
        <div className={styles.inputsRow}>
          <Input placeholder='Контактное лицо' />
          <Input placeholder='Номер телефона' />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Примечание
        </Text>
        <TextArea placeholder='Укажите доп. информацию' />
      </div>
      <div className={styles.buttonsContainer}>
        <Button className={styles.additionalButton} onClick={toAdditional}>
          <BurgerIcon />
          Дополнительные параметры заявки
        </Button>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={prevStep}
        >
          Назад
        </Button>
        <Button
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
          className={styles.button}
          type='submit'
        >
          Создать заявку
        </Button>
      </div>
    </>
  )
}