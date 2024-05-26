import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import ArrowLeft from '@images/arrow-full-left.svg'
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'
import { RadioButton } from '@shared/ui/RadioButton'
import { Select } from '@shared/ui/Select'

interface AdditionalStepOneProps {
  toMainPart: () => void
}

export const AdditionalStepOne = (props: AdditionalStepOneProps) => {
  const { toMainPart } = props;

  const { control, watch } = useContext(NewApplicationContext);

  const unit_of_measurement_for_cargo_shortage_rate = watch('unit_of_measurement_for_cargo_shortage_rate')

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Норма недостачи груза
        </Text>
        <div className={styles.inputsRowWithGap}>
          <Controller
            name="unit_of_measurement_for_cargo_shortage_rate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioButton checked={value === "%"} value="%" onChange={onChange}>
                В %
              </RadioButton>
            )}
          />
          <Controller
            name="unit_of_measurement_for_cargo_shortage_rate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioButton checked={value === "кг"} value="кг" onChange={onChange}>
                В кг
              </RadioButton>
            )}
          />
        </div>
        <Controller
          name="cargo_shortage_rate"
          control={control}
          rules={{ required: false, min: { value: 1, message: "Норма недостачи должна быть натуральным числом" } }}
          render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
            <Input
              label={`Укажите норму недостачи / ${unit_of_measurement_for_cargo_shortage_rate}`}
              type='number'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors[name]?.message as string}
            />
          )}
        />
      </div>
      <div className={styles.inputsRow}>
        <div className={styles.inputBlock}>
          <Text
            weight={TextWeight.BOLD}
            size={TextSize.XL}
          >
            Стоимость груза
          </Text>
          <Controller
            name="cargo_price"
            control={control}
            rules={{ required: false, min: { value: 1, message: "Стоимость груза должна быть натуральным числом" } }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Укажите стоимость груза ₽/Т'
                type='number'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>
        <div className={styles.inputBlock}>
          <Text
            weight={TextWeight.BOLD}
            size={TextSize.XL}
          >
            Где происходит погрузка
          </Text>
          <Controller
            name="load_place"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={["Склад", "Ток", "Поле", "Элеватор"]}
                setValue={onChange}
                value={value}
                label='Где будет осуществляться погрузка'
                withInputSearch
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
          Подъезд
        </Text>
        <div className={styles.inputsRowWithGap}>
          <Controller
            name="approach"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioButton checked={value === "Грунт"} value="Грунт" onChange={onChange}>
                Грунт
              </RadioButton>
            )}
          />
          <Controller
            name="approach"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioButton checked={value === "Асфальт"} value="Асфальт" onChange={onChange}>
                Асфальт
              </RadioButton>
            )}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button className={styles.additionalButton} onClick={toMainPart}>
          <ArrowLeft />
          Основные параметры заявки
        </Button>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={toMainPart}
        >
          Назад
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