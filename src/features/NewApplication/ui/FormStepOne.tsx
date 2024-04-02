import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Calendar } from '@shared/ui/Calendar'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import {useContext, useState} from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'
import { useSearchByDadata } from '@shared/hook/useSearchByDadata'
import { InputAutocomplete } from '@shared/ui/InputAutocomplete'

interface FormStepOneProps {
  onCancel: () => void
}

export const FormStepOne = (props: FormStepOneProps) => {
  const { onCancel } = props;
  const { control, watch, setValue } = useContext(NewApplicationContext);
  const [searchPlace, setSearchPlace] = useState('');
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [isPlaceOptionsLoading, setIsPlaceOptionsLoading] = useState(false);

  const load_place_name: string = watch('load_place_name');
  const unload_place_name: string = watch('unload_place_name');

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchPlace,
    target: 'address',
    debounceTime: 700,
    minQueryLength: 3,
    onSuccess: (data ) => {
      setPlaceOptions(data?.suggestions.map(item => item.value) ?? []);
      setIsPlaceOptionsLoading(false);
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
            {/*<InputAutocomplete*/}
            {/*  placeholder='Укажите пункт погрузки'*/}
            {/*  value={load_place_name}*/}
            {/*  setValue={(value) => setValue("load_place_name", value)}*/}
            {/*/>*/}
            <Select
              placeholder='Укажите пункт погрузки'
              withInputSearch
              onSearchInput={value => {
                if (value.length < 3) {
                  setPlaceOptions([]);
                  return;
                }
                setIsPlaceOptionsLoading(true);
                setSearchPlace(value);
              }}
              hideOptions={isPlaceOptionsLoading}
              options={placeOptions}
              minLengthForOptions={3}
              value={load_place_name}
              setValue={(value) => setValue('load_place_name', value)}
              noArrow
            />

            <Select placeholder='Грузополучатель/терминал выгрузки' options={[]} value={''} setValue={() => { }} />
            <Input placeholder='Экспортер' />
          </div>
          <div className={styles.inputBlock}>
            <Select
              placeholder='Укажите пункт выгрузки'
              withInputSearch
              onSearchInput={value => {
                if (value.length < 3) {
                  setPlaceOptions([]);
                  return;
                }
                setIsPlaceOptionsLoading(true);
                setSearchPlace(value);
              }}
              hideOptions={isPlaceOptionsLoading}
              options={placeOptions}
              minLengthForOptions={3}
              value={unload_place_name}
              setValue={(value) => setValue('unload_place_name', value)}
              noArrow
            />
            <Select placeholder='Таймслот' options={[]} value={''} setValue={() => { }} />
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