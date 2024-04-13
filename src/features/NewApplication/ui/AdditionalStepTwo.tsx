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

  const { control, setValue } = useContext(NewApplicationContext);

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
              },
              validate: (value) => {
                const time = value?.split(" - ").reduce((acc, value): string[] => {
                  const splittedValue = value.split(":")
                  return splittedValue.length ? [...acc, splittedValue[0], splittedValue[1]] : acc;
                }, [] as string[]) ?? [];

                const [startHours, startMinutes, endHours, endMinutes] = time;

                if (Number(startHours) > 23 || Number(endHours) > 23) return 'Неверный формат времени';
                if (Number(startMinutes) > 59 || Number(endMinutes) > 59) return 'Неверный формат времени';
                if (Number(startHours) > Number(endHours)) return 'Время начала больше времени окончания';
                if (Number(startHours) === Number(endHours) && Number(startMinutes) > Number(endMinutes)) return 'Время начала больше времени окончания';
                return true
              }
            }}
            render={({ formState: { errors }, field: { value, name, onChange, onBlur } }) => (
              <Input
                label='Время работы'
                mask="H9:M9 - H9:M9"
                type='tel'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                formatChars={{ 'H': '[0-2]', 'M': '[0-5]', '9': '[0-9]' }}
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
            <ControlCheckbox>Грузят в выходные</ControlCheckbox>
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