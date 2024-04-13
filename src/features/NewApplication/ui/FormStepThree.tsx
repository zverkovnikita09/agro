import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { TextArea } from '@shared/ui/TextArea'
import BurgerIcon from '@images/two-lines-burger.svg'
import { Select } from '@shared/ui/Select'
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'

interface FormStepThreeProps {
  prevStep: () => void
  toAdditional: () => void
  isLoading?: boolean
}

export const FormStepThree = (props: FormStepThreeProps) => {
  const { prevStep, toAdditional, isLoading } = props;
  const { control, watch } = useContext(NewApplicationContext);

  const outage_begin = watch('outage_begin') // начало простоя

  const outageBeginOptions = [
    { name: "Нет", value: 0 },
    { name: "с 1-х суток", value: 1 },
    { name: "со 2-х суток", value: 2 },
    { name: "с 3-х суток", value: 3 },
    { name: "с 4-х суток", value: 4 },
  ]

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
          <Controller
            name="outage_begin"
            control={control}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Начало периода простоя'
                options={outageBeginOptions}
                value={value}
                setValue={onChange}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="outage_price"
            control={control}
            rules={{ required: false, min: { value: 1, message: "Стоимость простоя ₽/в сутки должна быть натуральным числом" } }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Стоимость простоя ₽/в сутки'
                type='number'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                disabled={!outage_begin}
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
          Информация
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="contact_name"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Контактное лицо'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="contact_phone"
            control={control}
            rules={{
              required: 'Необходимо заполнить номер телефона.', pattern: {
                value: /^[^_]*$/,
                message: 'Необходимо заполнить номер телефона.'
              }
            }}
            render={({ formState: { errors }, field: { value, name, onChange, onBlur } }) => (
              <Input
                label='Номер телефона'
                mask="+7 (999) 999-99-99"
                type='tel'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
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
          Примечание
        </Text>
        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextArea
              placeholder='Укажите доп. информацию'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
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
          isLoading={isLoading}
        >
          Создать заявку
        </Button>
      </div>
    </>
  )
}