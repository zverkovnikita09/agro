import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { Controller } from 'react-hook-form'
import { useContext, useState } from 'react'
import { NewApplicationContext } from './NewApplication'
import { CROP_OPTIONS } from '@shared/lib/globalVariables'
import { useSearchByDadata } from '@shared/hook/useSearchByDadata'

interface FormStepTwoProps {
  prevStep: () => void
}

export const FormStepTwo = (props: FormStepTwoProps) => {
  const { prevStep } = props;
  const { control, watch } = useContext(NewApplicationContext);

  const tariff = watch('tariff');
  const nds_percent = watch('nds_percent');

  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [isCompanyOptionsLoading, setIsCompanyOptionsLoading] = useState(false);
  const timeslotOptions = ['Целевой', 'В общем доступе']

  const [searchCompany, setSearchCompany] = useState('');

  const minCompanyQueryLength = 2;

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchCompany,
    target: 'party',
    debounceTime: 700,
    minQueryLength: minCompanyQueryLength,
    onSuccess: (data) => {
      setCompanyOptions(data?.suggestions.map(item => item.value) ?? []);
      setIsCompanyOptionsLoading(false);
    },
  });

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Заказчик/отправитель
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="terminal_name"
            control={control}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Грузополучатель/терминал выгрузки'
                withInputSearch
                onSearchInput={(value) => {
                  if (value.length < minCompanyQueryLength) {
                    setCompanyOptions([]);
                    return;
                  }
                  setIsCompanyOptionsLoading(true);
                  setSearchCompany(value);
                }}
                hideOptions={isCompanyOptionsLoading}
                options={companyOptions}
                minLengthForOptions={minCompanyQueryLength}
                value={value}
                setValue={(value) => {
                  setSearchCompany("")
                  onChange(value)
                }}
                noArrow
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="exporter_name"
            control={control}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Экспортер'
                withInputSearch
                onSearchInput={(value) => {
                  if (value.length < minCompanyQueryLength) {
                    setCompanyOptions([]);
                    return;
                  }
                  setIsCompanyOptionsLoading(true);
                  setSearchCompany(value);
                }}
                hideOptions={isCompanyOptionsLoading}
                options={companyOptions}
                minLengthForOptions={minCompanyQueryLength}
                value={value}
                setValue={(value) => {
                  setSearchCompany("")
                  onChange(value)
                }}
                noArrow
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>
        <Controller
          name="timeslot"
          control={control}
          render={({ field: { value, name, onChange }, formState: { errors } }) => (
            <Select
              label='Таймслот'
              options={timeslotOptions}
              value={value}
              setValue={onChange}
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
          Груз и тарифы
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="crop"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
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