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
import { InputAutocomplete } from '@shared/ui/InputAutocomplete'

interface AdditionalStepOneProps {
  prevStep: () => void
  toMainPart: () => void
  isLoading?: boolean
}

export const AdditionalStepTwo = (props: AdditionalStepOneProps) => {
  const { toMainPart, prevStep, isLoading } = props;

  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  const [saturdayState, setSaturdayState] = useState('');
  const [sundayState, setSundayState] = useState('');

  useEffect(() => {
    setValue("clarification_of_the_weekend", [saturdayState, sundayState].filter(Boolean).join(" и "))
  }, [saturdayState, sundayState])

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Тип выгрузки
        </Text>
        <Controller
              name="unload_method"
              control={control}
              render={({ field: { value, name, onChange, onBlur } }) => (
                <InputAutocomplete
                  name={name}
                  label='Выберите тип выгрузки'
                  value={value}
                  setValue={onChange}
                  onBlur={onBlur}
                  autocompleteItems={["Боковая", "Задняя", "Самосвальная задняя", "Самосвальная боковая"]}
                />
              )}
            />
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
          <MultiCheckbox hideNested>
            <ControlCheckbox>Все</ControlCheckbox>
            <NestedCheckbox
              checked={!!saturdayState}
              className={styles.nestedCheckbox}
              setChecked={() => setSaturdayState(prev => prev ? '' : 'суббота')}
              name='saturday'
            >
              СБ
            </NestedCheckbox>
            <NestedCheckbox
              checked={!!sundayState}
              setChecked={() => setSundayState(prev => prev ? '' : 'воскресенье')}
              name='sunday'
            >
              ВС
            </NestedCheckbox>
          </MultiCheckbox>
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
              <RadioButton checked={value === 1} onChange={() => setValue(name, 1)}>
                Полная
              </RadioButton>
            )}
          />
          <Controller
            name="is_full_charter"
            control={control}
            render={({ field: { value, name } }) => (
              <RadioButton checked={value === 0} onChange={() => setValue(name, 0)}>
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
          isLoading={isLoading}
          type='submit'
        >
          Создать заявку
        </Button>
      </div>
    </>
  )
}