import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Calendar } from '@shared/ui/Calendar'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { useContext, useState } from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'
import { useSearchByDadata } from '@shared/hook/useSearchByDadata'
import { InputAutocomplete } from '@shared/ui/InputAutocomplete'

interface FormStepOneProps {
  onCancel: () => void
}

export const FormStepOne = (props: FormStepOneProps) => {
  const { onCancel } = props;
  const { control } = useContext(NewApplicationContext);

  const [searchPlace, setSearchPlace] = useState('');
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [isPlaceOptionsLoading, setIsPlaceOptionsLoading] = useState(false);
  const minPlaceQueryLength = 3;

  const [searchCompany, setSearchCompany] = useState('');
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [isCompanyOptionsLoading, setIsCompanyOptionsLoading] = useState(false);
  const minCompanyQueryLength = 2;

  const timeslotOptions = ['Целевой', 'В общем доступе']

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchPlace,
    target: 'address',
    debounceTime: 700,
    minQueryLength: minPlaceQueryLength,
    onSuccess: (data) => {
      setPlaceOptions(data?.suggestions.map(item => item.value) ?? []);
      setIsPlaceOptionsLoading(false);
    },
  });

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
          Дата перевозки
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="start_order_at"
            control={control}
            // rules={{ required: true }}
            render={(props) => (
              <Calendar
                placeholder='Дата начала перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
              />
            )}
          />
          <Controller
            name="end_order_at"
            control={control}
            // rules={{ required: true }}
            render={(props) => (
              <Calendar
                placeholder='Дата окончания перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
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
          Маршрут перевозки
        </Text>
        <div className={styles.inputBlock}>
          <div className={styles.inputsRow}>
            <Controller
              name="load_place_name"
              control={control}
              rules={{ required: "Поле обязательно к заполнению" }}
              render={({ field: { value, name, onChange }, formState: { errors } }) => (
                <Select
                  label='Укажите пункт погрузки'
                  withInputSearch
                  onSearchInput={(value) => {
                    if (value.length < minPlaceQueryLength) {
                      setPlaceOptions([]);
                      return;
                    }
                    setIsPlaceOptionsLoading(true);
                    setSearchPlace(value);
                  }}
                  hideOptions={isPlaceOptionsLoading}
                  options={placeOptions}
                  minLengthForOptions={minPlaceQueryLength}
                  value={value}
                  setValue={onChange}
                  noArrow
                  error={errors[name]?.message as string}
                />
              )}
            />
            <Controller
              name="unload_place_name"
              control={control}
              rules={{ required: "Поле обязательно к заполнению" }}
              render={({ field: { value, name, onChange }, formState: { errors } }) => (
                <Select
                  label='Укажите пункт выгрузки'
                  withInputSearch
                  onSearchInput={(value) => {
                    if (value.length < minPlaceQueryLength) {
                      setPlaceOptions([]);
                      return;
                    }
                    setIsPlaceOptionsLoading(true);
                    setSearchPlace(value);
                  }}
                  hideOptions={isPlaceOptionsLoading}
                  options={placeOptions}
                  minLengthForOptions={minPlaceQueryLength}
                  value={value}
                  setValue={onChange}
                  noArrow
                  error={errors[name]?.message as string}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.inputsRow}>
          <Controller
            name="terminal_name"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
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
                setValue={onChange}
                noArrow
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="exporter_name"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
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
                setValue={onChange}
                noArrow
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>
        <Controller
          name="timeslot"
          control={control}
          rules={{ required: "Поле обязательно к заполнению" }}
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
      <div className={styles.buttonsContainer}>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={onCancel}
        >
          Отмена
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