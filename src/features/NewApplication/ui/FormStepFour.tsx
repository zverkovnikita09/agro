import { useContext } from 'react'
import styles from './NewApplication.module.scss'
import { NewApplicationContext } from './NewApplication'
import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import { Controller } from 'react-hook-form'
import { Input } from '@shared/ui/Input'
import { TextArea } from '@shared/ui/TextArea'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import BurgerIcon from '@images/two-lines-burger.svg'

interface FormStepFourProps {
  prevStep: () => void
  toAdditional: () => void
  isLoading?: boolean
}

export const FormStepFour = ({ isLoading, prevStep, toAdditional }: FormStepFourProps) => {
  const { control } = useContext(NewApplicationContext)
  return (
    <>
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