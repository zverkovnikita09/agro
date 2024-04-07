import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Select } from '@shared/ui/Select'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import ArrowLeft from '@images/arrow-full-left.svg'
import { MultiCheckbox, NestedCheckbox, ControlCheckbox } from '@shared/ui/MultiCheckbox'
import { Controller, useForm } from 'react-hook-form'
import { RadioButton } from '@shared/ui/RadioButton'
import { useContext, useEffect, useState } from 'react'
import { NewApplicationContext } from './NewApplication'

interface AdditionalStepOneProps {
  prevStep: () => void
  toMainPart: () => void
}

export const AdditionalStepTwo = (props: AdditionalStepOneProps) => {
  const { toMainPart, prevStep } = props;

  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  /* const cargo_price = watch('unl') */ // тип выгрузки
  const clarification_of_the_weekend = watch("clarification_of_the_weekend") //Сб Вс или СБ и ВС
  const is_full_charter = watch("is_full_charter")

  /* const [weekendState, setWeekendState] = useState<string[]>([]) */

  /* useEffect(() => {
    setValue("clarification_of_the_weekend", weekendState.join(" и "))
    
  }, [weekendState])

  console.log(clarification_of_the_weekend); */

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Тип выгрузки
        </Text>
        <Select placeholder='Выберите тип выгрузки' options={[]} value={''} setValue={() => { }} />
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Время работы
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="work_time"
            control={control}
            rules={{
              required: false, pattern: {
                value: /^[^_]*$/,
                message: 'Время работы должно быть заполнено в формате ЧЧ:ММ - ЧЧ:ММ'
              }
            }}
            render={({ formState: { errors }, field: { value, name, onChange, onBlur } }) => (
              <Input
                label='Время работы'
                mask="99:99 - 99:99"
                type='tel'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="loader_power"
            control={control}
            rules={{ required: false, min: { value: 1, message: "Мощность погрузки должна быть натуральным числом" } }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Мощность погрузки машин/день'
                type='number'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>
        <div className={styles.inputsRowWithGap}>
          {/* <MultiCheckbox hideNested>
            <ControlCheckbox>Все</ControlCheckbox>
            <NestedCheckbox
              checked={weekendState.includes("суббота")}
              className={styles.nestedCheckbox}
              setChecked={() => {
                if (!weekendState.length) {
                  setWeekendState(prev => ["суббота", ...prev])
                  return;
                }
                if (weekendState.length === 2) {
                  setWeekendState([])
                  return;
                }
                if (weekendState.includes("суббота")) {
                  setWeekendState(["воскресенье"])
                }
              }}
              name=''
            >
              СБ
            </NestedCheckbox>
            <NestedCheckbox
              checked={!!weekendState.includes("воскресенье")}
              setChecked={() => {
                if (!weekendState.length) {
                  setWeekendState(prev => [...prev, "воскресенье"])
                }
              }}
              name=''
            >
              ВС
            </NestedCheckbox>
          </MultiCheckbox> */}
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Хартия
        </Text>
        <div className={styles.inputsRowWithGap}>
          <Controller
            name="is_full_charter"
            control={control}
            render={({ field: { value, name } }) => (
              <RadioButton checked={value === true} onChange={() => setValue(name, true)}>
                Полная
              </RadioButton>
            )}
          />
          <Controller
            name="is_full_charter"
            control={control}
            render={({ field: { value, name } }) => (
              <RadioButton checked={value === false} onChange={() => setValue(name, false)}>
                Не полная
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
          onClick={prevStep}
        >
          Назад
        </Button>
        <Button
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
          className={styles.button}
        >
          Создать заявку
        </Button>
      </div>
    </>
  )
}