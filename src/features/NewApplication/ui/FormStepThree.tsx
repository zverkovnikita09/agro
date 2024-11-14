import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { Select } from '@shared/ui/Select'
import { useContext, useEffect, useState } from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'
import { useGetData } from '@shared/hook/useGetData'
import { LoadingBlock } from '@shared/ui/LoadingBlock'
import { ControlCheckbox, MultiCheckbox, NestedCheckbox } from '@shared/ui/MultiCheckbox'
import { ErrorBlock } from '@shared/ui/ErrorBlock'

interface FormStepThreeProps {
  prevStep: () => void
}

export const FormStepThree = (props: FormStepThreeProps) => {
  const { prevStep } = props;
  const { control, watch, resetField, setValue } = useContext(NewApplicationContext);

  const outage_begin = watch('outage_begin') // начало простоя

  const outageBeginOptions = [
    { name: "Нет", value: 0 },
    { name: "с 1-х суток", value: 1 },
    { name: "со 2-х суток", value: 2 },
    { name: "с 3-х суток", value: 3 },
    { name: "с 4-х суток", value: 4 },
  ]

  const { data: options, isSuccess: isOptionsSuccess } = useGetData<{
    crop: string[]
    load_types: { id: string, title: string }[]
    timeslot: string[]
    unload_methods: { id: string, title: string }[]
    load_methods: string[]
  }>(
    {
      url: '/api/v1/options',
      dataFlag: true,
      withAuthToken: true,
    })

  useEffect(() => {
    if (!outage_begin) resetField("outage_price")
  }, [outage_begin])

  const toleranceToTheNormOptions = [
    { name: "Нет", value: null },
    { name: "1%", value: 1 },
    { name: "2%", value: 2 },
    { name: "3%", value: 3 },
    { name: "4%", value: 4 },
    { name: "5%", value: 5 },
    { name: "6%", value: 6 },
    { name: "7%", value: 7 },
    { name: "8%", value: 8 },
    { name: "9%", value: 9 },
    { name: "10%", value: 10 },
  ]
  const load_types = watch("load_types")

  const [loadTypes, setLoadTypes] = useState<string[]>(load_types)

  useEffect(() => {
    if (loadTypes) {
      setValue("load_types", loadTypes)
    }
  }, [loadTypes])

  return (
    <>
      {!isOptionsSuccess && (
        <div className={styles.loading}>
          <LoadingBlock />
        </div>
      )}
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Детали погрузки
        </Text>
        <Controller
          name="load_types"
          control={control}
          rules={{
            required: "Необходимо выбрать один из вариантов",
          }}
          render={({ field: { name }, formState: { errors } }) => (
            <div className={styles.inputsRowWithGap}>
              <MultiCheckbox>
                <ControlCheckbox>Любой</ControlCheckbox>
                {options?.load_types.map(({ id, title }) => (
                  <NestedCheckbox
                    key={id}
                    checked={!!loadTypes?.includes(id)}
                    setChecked={(_, checked) => {
                      if (!checked) {
                        setLoadTypes((prev) => prev?.filter(item => item !== id))
                        return;
                      }
                      setLoadTypes(prev => [...(prev ?? []), id])
                    }}
                    name={title}
                  >
                    {title}
                  </NestedCheckbox>
                ))}
              </MultiCheckbox>
              {errors[name]?.message && <ErrorBlock className={styles.checkboxError}>{errors[name]!.message!}</ErrorBlock>}
            </div>
          )}
        />
        <Controller
          name="load_method"
          control={control}
          rules={{ required: "Поле обязательно к заполнению" }}
          render={({ field: { value, name, onChange }, formState: { errors } }) => (
            options?.load_methods?.length ? <Select
              label='Способ погрузки'
              options={options?.load_methods ?? []}
              value={value}
              setValue={onChange}
              error={errors[name]?.message as string}
            /> : <></>
          )}
        />
        <div className={styles.inputsRow}>
          <Controller
            name="scale_length"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              min: { value: 1, message: "Длина весов должна быть натуральным числом" }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Длина весов / м'
                type='number'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="height_limit"
            control={control}
            rules={{
              required: false,
              min: { value: 1, message: "Ограничение по высоте должно быть натуральным числом" }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Ограничение по высоте / м'
                type='number'
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
          Допуск к норме
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="tolerance_to_the_norm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                label='Укажите допуск к норме %'
                options={toleranceToTheNormOptions}
                value={value}
                setValue={onChange}
              />
            )}
          />
          <Controller
            name="is_overload"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                label='Возможность перегруза'
                options={[{ name: "Да", value: 1 }, { name: "Нет", value: 0 }]}
                value={value}
                setValue={onChange}
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
            render={({ field: { name, onChange, onBlur, value }, formState: { errors } }) => (
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
      <div className={styles.buttonsContainer}>
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
          Далее
        </Button>
      </div>
    </>
  )
}