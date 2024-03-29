import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Calendar } from '@shared/ui/Calendar'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'

interface FormStepOneProps {
  nextStep: () => void
  onCancel: () => void
}

export const FormStepOne = (props: FormStepOneProps) => {
  const { nextStep, onCancel } = props;
  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Дата перевозки
        </Text>
        <div className={styles.inputsRow}>
          <Calendar />
          <Calendar />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Маршрут перевозки
        </Text>
        <div className={styles.inputsRow}>
          <div className={styles.inputBlock}>
            <Input placeholder='Укажите пункт погрузки' />
            <Select placeholder='Грузополучатель/терминал выгрузки' options={[]} value={''} setValue={() => { }} />
            <Input placeholder='Экспортер' />
          </div>
          <div className={styles.inputBlock}>
            <Input placeholder='Укажите пункт выгрузки' />
            <Select placeholder='Таймслот' options={[]} value={''} setValue={() => { }} />
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
          className={styles.button}
          onClick={nextStep}
        >
          Далее
        </Button>
      </div>
    </>
  )
}