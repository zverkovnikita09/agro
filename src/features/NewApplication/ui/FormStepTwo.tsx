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
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'

interface FormStepTwoProps {
  prevStep: () => void
}

export const FormStepTwo = (props: FormStepTwoProps) => {
  const { prevStep } = props;
  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  const crop = watch('crop') // груз

  const tariff = watch('tariff');
  const nds_percent = watch('nds_percent');

  const load_types = watch("load_types"); //массив id (чекбоксы)

  const tolerance_to_the_norm = watch("tolerance_to_the_norm") //допуск к норме

  const is_overload = watch("is_overload") //возможность перегруза

  const loadMethodOptions = ["Маниту", "Зерномет", "Из-под трубы", "Комбайн", "Кун", "Амкодор", "Вертикальный", "Элеватор"]

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
          <div className={styles.inputBlock}>
            <Input placeholder='Выберите груз' />
            <div>
              <Controller
                name="tariff"
                control={control}
                rules={{ required: "Поле обязательно к заполнению", min: { value: 1, message: "Тариф должен быть натуральным числом" } }}
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
              name="distance"
              control={control}
              rules={{ required: false, min: { value: 1, message: "Расстояние перевозки должно быть натуральным числом" } }}
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
          </div>
          <div className={styles.inputBlock}>
            <Controller
              name="volume"
              control={control}
              rules={{ required: "Поле обязательно к заполнению", min: { value: 1, message: "Объем должен быть натуральным числом" } }}
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
            <Controller
              name="daily_load_rate"
              control={control}
              rules={{ required: false, min: { value: 1, message: "Суточная норма погрузки должна быть натуральным числом" } }}
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
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Детали погрузки
        </Text>
        <div className={styles.inputsRow}>
          {/* <Checkbox checked={scepky} setChecked={setValue} name='scepky'>Сцепки</Checkbox>
          <Checkbox checked={any} setChecked={setValue} name='any'>Полуприцеп</Checkbox>
          <Checkbox checked={scepky} setChecked={setValue} name='scepky'>Тонар</Checkbox> */}
        </div>
        <div className={styles.inputsThreeRow}>
          <Controller
            name="load_method"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Способ погрузки'
                options={loadMethodOptions}
                value={value}
                setValue={onChange}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="scale_lenght"
            control={control}
            rules={{ required: "Поле обязательно к заполнению", min: { value: 1, message: "Длина весов должна быть натуральным числом" } }}
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
            rules={{ required: "Поле обязательно к заполнению", min: { value: 1, message: "Ограничение по высоте должно быть натуральным числом" } }}
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
          <Input placeholder='Укажите допуск к норме %' />
          <Controller
            name="is_overload"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                label='Возможность перегруза'
                options={["Да", "Нет"]}
                value={typeof value === "undefined" ? "" : value ? "Да" : "Нет"}
                setValue={(value) => onChange(value === "Да")}
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