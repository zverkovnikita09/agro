import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { Checkbox } from '@shared/ui/Checkbox'
import { MultiCheckbox } from '@shared/ui/MultiCheckbox'
import { ControlCheckbox } from '@shared/ui/MultiCheckbox/ControlCheckbox'
import { Controller, useForm } from 'react-hook-form'
import { NestedCheckbox } from '@shared/ui/MultiCheckbox/NestedCheckbox'
import { useContext, useEffect, useState } from 'react'
import { NewApplicationContext } from './NewApplication'
import { InputAutocomplete } from '@shared/ui/InputAutocomplete'
import { useGetData } from "@shared/hook/useGetData";
import { ErrorBlock } from '@shared/ui/ErrorBlock'
import { LoadingBlock } from '@shared/ui/LoadingBlock'

interface FormStepTwoProps {
  prevStep: () => void
}

export const FormStepTwo = (props: FormStepTwoProps) => {
  const { prevStep } = props;
  const { control, watch, setValue } = useContext(NewApplicationContext);

  const { data: loadMethodOptions, isLoading: loadMethodOptionsLoading } = useGetData<string[]>({ url: '/api/v1/load_methods', dataFlag: true })

  const { data: loadTypes, isLoading: isLoadTypesLoading } = useGetData<{ id: string, title: string }[]>({ url: '/api/v1/load_types', dataFlag: true })

  const tariff = watch('tariff');
  const nds_percent = watch('nds_percent');

  const load_types = watch("load_types"); //массив id (чекбоксы)

  const toleranceToTheNormOptions = [
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

  const cropOptions = [
    "Барда",
    "Горох",
    "Горчица",
    "Жмых",
    "Жом",
    "Жом гранулированный",
    "Корм кукурузный глютеновый",
    "Кукуруза",
    "Кукурузный зародыш",
    "Лен",
    "Лузга подсолнечника",
    "Масло подсолнечное",
    "Металл",
    "Нитроаммофоска",
    "Нут",
    "Овес",
    "Орехи ШИ",
    "Отруби гранулированные",
    "Отруби пушистые",
    "Песок",
    "Подсолнечник",
    "Просо",
    "Пшеница",
    "Пшеница 3 - кл",
    "Пшеница 4 - кл",
    "Пшеница 5 - кл",
    "Рапс",
    "Рис",
    "Рожь",
    "Рыжик",
    "Сафлор",
    "Свекла",
    "Селитра",
    "Семена",
    "Сорго",
    "Щебень",
    "Уголь",
    "Соя",
    "Удобрения",
    "Чечевица",
    "Шрот",
    "Яблоки",
    "Ячмень",
    "Аммофос",
    "Тритикале",
    "Люпин"
  ]

  const [loadTypesValues, setLoadTypesValues] = useState<string[]>(load_types)

  useEffect(() => {
    if (loadTypesValues) {
      setValue("load_types", loadTypesValues)
    }
  }, [loadTypesValues])

  if (isLoadTypesLoading && loadMethodOptionsLoading) return (
    <LoadingBlock />
  )

  return (
    <>
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
              <InputAutocomplete
                name={name}
                label='Выберите груз'
                value={value}
                setValue={onChange}
                onBlur={onBlur}
                autocompleteItems={cropOptions}
                error={errors[name]?.message as string}
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
                label='Суточная норма поргрузки / Т'
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
                {loadTypes?.map(({ id, title }) => (
                  <NestedCheckbox
                    key={id}
                    checked={!!loadTypesValues?.includes(id)}
                    setChecked={(_, checked) => {
                      if (!checked) {
                        setLoadTypesValues((prev) => prev?.filter(item => item !== id))
                        return;
                      }
                      setLoadTypesValues(prev => [...(prev ?? []), id])
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
                options={loadMethodOptions ?? []}
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