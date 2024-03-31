import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Calendar } from '@shared/ui/Calendar'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'

interface FormStepOneProps {
  onCancel: () => void
}

export const FormStepOne = (props: FormStepOneProps) => {
  const { onCancel } = props;
  const { control, } = useContext(NewApplicationContext)
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
          <Controller
            name="start_order_at"
            control={control}
            rules={{ required: true }}
            render={(props) => (
              <Calendar
                placeholder='Дата начала перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
              />
            )}
          />
          <Controller
            name="end_order_at"
            control={control}
            rules={{ required: true }}
            render={(props) => (
              <Calendar
                placeholder='Дата окончания перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
              />
            )}
          />
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
          type='submit'
        >
          Далее
        </Button>
      </div>
    </>
  )
}