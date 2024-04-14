import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { MultiCheckbox } from '@shared/ui/MultiCheckbox'
import { ControlCheckbox } from '@shared/ui/MultiCheckbox/ControlCheckbox'
import { Controller } from 'react-hook-form'
import { NestedCheckbox } from '@shared/ui/MultiCheckbox/NestedCheckbox'
import { useContext, useEffect, useState } from 'react'
import { NewApplicationContext } from './NewApplication'
import { useGetData } from "@shared/hook/useGetData";
import { ErrorBlock } from '@shared/ui/ErrorBlock'
import { LoadingBlock } from '@shared/ui/LoadingBlock'
import { CROP_OPTIONS } from '@shared/lib/globalVariables'

interface FormStepTwoProps {
  prevStep: () => void
}

export const FormStepTwo = (props: FormStepTwoProps) => {
  const { prevStep } = props;
  const { control, watch, setValue } = useContext(NewApplicationContext);

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

  const tariff = watch('tariff');
  const nds_percent = watch('nds_percent');

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

  const [loadTypes, setLoadTypes] = useState<string[]>([])

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
          Груз и тарифы
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="crop"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Select
                options={CROP_OPTIONS}
                setValue={onChange}
                value={value}
                error={errors[name]?.message as string}
                label='Выберите груз'
                withInputSearch
              />
            )}
          />
          <Controller
            name="volume"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              min: { value: 1, message: "Объем должен быть натуральным числом" }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Общий объем груза / Т'
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
          <div>
            <Controller
              name="tariff"
              control={control}
              rules={{
                required: "Поле обязательно к заполнению",
                min: { value: 1, message: "Тариф должен быть натуральным числом" }
              }}
              render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
                <Input
                  label='Тариф за перевозку ₽/Т Без НДС'
                  type='number'
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors[name]?.message as string}
                />
              )}
            />
            {Number(nds_percent) > 0 && Number(tariff) > 0 &&
              <Text
                size={TextSize.S}
                className={styles.additionalText}
                weight={TextWeight.MEDIUM}>
                Тариф с учетом НДС {Number(tariff) + Math.ceil(Number(tariff) * Number(nds_percent) / 100)} ₽
              </Text>
            }
          </div>
          <Controller
            name="nds_percent"
            control={control}
            rules={{ required: false, min: { value: 1, message: "НДС должен быть натуральным числом" } }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Укажите ставку НДС %'
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
          <Controller
            name="distance"
            control={control}
            rules={{ required: "Поле обязательно к заполнению", min: { value: 1, message: "Расстояние перевозки должно быть натуральным числом" } }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Расстояние перевозки / км'
                type='number'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="daily_load_rate"
            control={control}
            rules={{
              required: false,
              min: { value: 1, message: "Суточная норма погрузки должна быть натуральным числом" }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Суточная норма погрузки / Т'
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
        <div className={styles.inputsThreeRow}>
          <Controller
            name="load_method"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Способ погрузки'
                options={options?.load_methods ?? []}
                value={value}
                setValue={onChange}
                error={errors[name]?.message as string}
              />
            )}
          />
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
              required: "Поле обязательно к заполнению",
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