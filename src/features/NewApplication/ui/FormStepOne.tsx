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
  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  const load_place_name: string = watch('load_place_name');
  const unload_place_name: string = watch('unload_place_name');

  const [searchPlace, setSearchPlace] = useState('');
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [isPlaceOptionsLoading, setIsPlaceOptionsLoading] = useState(false);
  const minPlaceQueryLength = 3;

  const terminal_name = watch('terminal_name')
  const exporter_name = watch('exporter_name');

  const [searchCompany, setSearchCompany] = useState('');
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [isCompanyOptionsLoading, setIsCompanyOptionsLoading] = useState(false);
  const minCompanyQueryLength = 2;

  const timeslot = watch('timeslot')
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
        <div className={styles.inputsRow}>
          <div className={styles.inputBlock}>
            <Select
              label='Укажите пункт погрузки'
              withInputSearch
              onSearchInput={value => {
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
              value={load_place_name}
              setValue={(value) => setValue('load_place_name', value)}
              noArrow
            />
            <Select
              label='Грузополучатель/терминал выгрузки'
              withInputSearch
              onSearchInput={value => {
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
              value={terminal_name}
              setValue={(value) => setValue('terminal_name', value)}
              noArrow
            />
            <Select
              label='Экспортер'
              withInputSearch
              onSearchInput={value => {
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
              value={exporter_name}
              setValue={(value) => setValue('exporter_name', value)}
              noArrow
            />
          </div>
          <div className={styles.inputBlock}>
            <Select
              label='Укажите пункт выгрузки'
              withInputSearch
              onSearchInput={value => {
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
              value={unload_place_name}
              setValue={(value) => setValue('unload_place_name', value)}
              noArrow
            />
            <Select
              label='Таймслот'
              options={timeslotOptions}
              value={timeslot}
              setValue={(value) => setValue('timeslot', value)}
            />
          </div>
        </div>
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