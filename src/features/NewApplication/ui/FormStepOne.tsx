import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Calendar } from '@shared/ui/Calendar'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { useContext, useEffect, useState } from 'react'
import { NewApplicationContext } from './NewApplication'
import { Controller } from 'react-hook-form'
import { useSearchByDadata } from '@shared/hook/useSearchByDadata'
import dayjs from 'dayjs'
import { Input } from '@shared/ui/Input'
import { ApplicationMap } from './ApplicationMap'
import { Coord } from '@entities/Application'

interface FormStepOneProps {
  onCancel: () => void
}

export const FormStepOne = (props: FormStepOneProps) => {
  const { onCancel } = props;
  const { control, watch, setValue, coords, handleCoordsChange } = useContext(NewApplicationContext);

  const [searchPlace, setSearchPlace] = useState('');
  const [placeOptions, setPlaceOptions] = useState<any[]>([]);
  const [isPlaceOptionsLoading, setIsPlaceOptionsLoading] = useState(false);
  const minPlaceQueryLength = 3;

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchPlace,
    target: 'address',
    debounceTime: 700,
    minQueryLength: minPlaceQueryLength,
    onSuccess: (data) => {
      setPlaceOptions(data?.suggestions ?? []);
      setIsPlaceOptionsLoading(false);
    },
  });

  const load_place = watch("load_place_name");
  const unload_place = watch("unload_place_name")

  const start_order_at = watch("start_order_at");

  useEffect(() => {
    if (load_place && placeOptions.length) {
      handleCoordsChange?.({ y: placeOptions.find(item => item.value === load_place)?.data?.geo_lat, x: placeOptions.find(item => item.value === load_place)?.data?.geo_lon }, "from");
    }
  }, [load_place])

  useEffect(() => {
    if (unload_place && placeOptions.length) {
      handleCoordsChange?.({ y: placeOptions.find(item => item.value === unload_place)?.data?.geo_lat, x: placeOptions.find(item => item.value === unload_place)?.data?.geo_lon }, "to");
    }
  }, [unload_place])

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
            rules={{
              required: "Поле обязательно к заполнению", validate: (value) => {
                return value && value >= dayjs().format("YYYY-MM-DD") || 'Дата начала меньше текущей даты';
              }
            }}
            render={(props) => (
              <Calendar
                placeholder='Дата начала перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
                error={props.fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="end_order_at"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению", validate: (value) => {
                if (!start_order_at) return true;
                return value && value > start_order_at! || 'Дата окончания меньше даты начала';
              }
            }}
            render={(props) => (
              <Calendar
                placeholder='Дата окончания перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
                error={props.fieldState.error?.message}
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
                  options={placeOptions.map(item => item.value as string)}
                  minLengthForOptions={minPlaceQueryLength}
                  value={value}
                  setValue={(value) => {
                    setSearchPlace("")
                    onChange(value)
                  }}
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
                  options={placeOptions.map(item => item.value as string)}
                  minLengthForOptions={minPlaceQueryLength}
                  value={value}
                  setValue={(value) => {
                    setSearchPlace("")
                    onChange(value)
                  }}
                  noArrow
                  error={errors[name]?.message as string}
                />
              )}
            />
          </div>
        </div>
        <ApplicationMap setDistance={(value) => setValue("distance", value)} />
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