import cn from 'classnames';
import styles from './Filters.module.scss'
import { Text, TextColor, TextSize, TextWeight } from "@shared/ui/Text";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Accordion } from "@shared/ui/Accordion";
import { InputRange } from "@shared/ui/InputRange";
import { CardContainer } from "@shared/ui/CardContainer";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectTheme } from "@shared/ui/Select";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@shared/ui/Checkbox";
import { RadioButton } from "@shared/ui/RadioButton";
import { Input, InputTheme } from "@shared/ui/Input";
import { ControlCheckbox, MultiCheckbox, NestedCheckbox } from "@shared/ui/MultiCheckbox";
import { useEffect, useState } from "react";
import { TogglerCheckbox } from "@shared/ui/TogglerCheckbox";
import { useLocalStorage } from '@shared/hook/useLocalStorage';
import { LSKeys } from '@shared/lib/globalVariables';
import { Filters as FiltersType } from '../model/Filters.model';
import { useSelector } from 'react-redux';
import { FiltersSelectors } from '../model/Filters.selectors';
import { useGetData } from '@shared/hook/useGetData';

interface FiltersProps {
  className?: string;
  isOpen: boolean;
  closeFilters: () => void;
}

export const Filters = (props: FiltersProps) => {
  const { className, isOpen, closeFilters } = props;
  const location = useLocation();
  const [needToSaveFilters, setNeedToSaveFilters] = useState(Boolean(JSON.parse(localStorage.getItem(LSKeys.FILTERS) as string)));

  /* const { setValue, watch } = useForm();
  const from = watch('from');
  const to = watch('to'); */

  useEffect(() => {
    closeFilters();
  }, [location]);

  const [, setLSFilters] = useLocalStorage(LSKeys.FILTERS, null)
  const { control, watch, setValue, reset } = useForm<FiltersType>()
  const distance_from = watch('distance_from');
  const distance_to = watch('distance_to');

  const { data: loadTypes, isLoading: isLoadTypesLoading } = useGetData<{ id: string, title: string }[]>({ url: '/api/v1/load_types', dataFlag: true })

  const timeslot = watch("timeslot")

  //Грузят в выходные
  const [saturdayState, setSaturdayState] = useState('');
  const [sundayState, setSundayState] = useState('');

  useEffect(() => {
    setValue("clarification_of_the_weekend", [saturdayState, sundayState].filter(Boolean).join(" и "))
  }, [saturdayState, sundayState])

  return (
    <CardContainer className={cn(styles.filters, className, { [styles.activeFilter]: isOpen })}>
      <div className={styles.heading}>
        <Text size={TextSize.XL} weight={TextWeight.SEMI_BOLD}>
          Фильтры
        </Text>
        <Button onClick={() => reset()}>
          <Text size={TextSize.S} weight={TextWeight.MEDIUM} color={TextColor.GREY}>
            Очистить все
          </Text>
        </Button>
      </div>
      <div className={styles.body}>
        <Accordion className={styles.accordion} accordionTitle={'Расстояние'}>
          <InputRange
            //@ts-ignore
            setValue={setValue}
            value={[distance_from as number, distance_to as number]}
            names={{ from: 'distance_from', to: 'distance_to' }}
            min={0}
            max={10000}
            step={500}
            units='км'
            prevValueTextFrom='от'
            prevValueTextTo='до'
          />
        </Accordion>
        {/* <Accordion className={styles.accordion} accordionTitle={'Область погрузки'}>
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите одну или несколько' options={[]} value={''} setValue={() => { }} />
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите район(ы)' options={[]} value={''} setValue={() => { }} />
        </Accordion> */}
        {/* <Accordion className={styles.accordion} accordionTitle={'Область выгрузки'}>
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите одну или несколько' options={[]} value={''} setValue={() => { }} />
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите район(ы)' options={[]} value={''} setValue={() => { }} />
        </Accordion> */}
        {/* <Accordion className={styles.accordion} accordionTitle={'Отображать новые территории'}>
          <RadioButton>Да</RadioButton>
          <RadioButton>Нет</RadioButton>
        </Accordion> */}
        {/* <Accordion className={styles.accordion} accordionTitle={'Культура'}>
          <Controller
            name="load_types"
            control={control}
            rules={{
              required: "Необходимо выбрать один из вариантов",
            }}
            render={({ field: { name }, formState: { errors } }) => (
              loadTypes?.map(({ id, title }) => (
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
              ))
            )}
          />
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
        </Accordion> */}
        <Accordion className={styles.accordion} accordionTitle={'Стоимость перевозки'}>
          <div className={styles.inputRow}>
            <Controller
              name="tariff_from"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  theme={InputTheme.FILTERS}
                  placeholder='От'
                  value={value}
                  onChange={onChange}
                  type='number'
                />
              )}
            />
            <Controller
              name="tariff_to"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  theme={InputTheme.FILTERS}
                  placeholder='До'
                  value={value}
                  onChange={onChange}
                  type='number'
                />
              )}
            />
          </div>
        </Accordion>
        {/*  <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Отображать цену (НДС/б.НДС)'}>
          <MultiCheckbox>
            <ControlCheckbox className={styles.controlCheckbox}>Все</ControlCheckbox>
            <NestedCheckbox
              checked={false}
              className={styles.nestedCheckbox}
              setChecked={setValue}
              name='loadingOnSaturday'
            >
              С НДС
            </NestedCheckbox>
            <NestedCheckbox
              checked={false}
              setChecked={setValue}
              name='loadingOnSunday'
            >
              Без НДС
            </NestedCheckbox>
          </MultiCheckbox>
        </Accordion> */}
        <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Таймслот'}>
          <MultiCheckbox>
            <ControlCheckbox className={styles.controlCheckbox}>Любой</ControlCheckbox>
            <NestedCheckbox
              checked={!!timeslot?.[0]}
              className={styles.nestedCheckbox}
              setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? "Целевой" : "")}
              name='timeslot.0'
            >
              Целевой
            </NestedCheckbox>
            <NestedCheckbox
              checked={!!timeslot?.[1]}
              setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? "В общем доступе" : "")}
              name='timeslot.1'
            >
              В общем доступе
            </NestedCheckbox>
          </MultiCheckbox>
        </Accordion>
        {/* <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Тип транспорта'}>
          <MultiCheckbox>
            <ControlCheckbox className={styles.controlCheckbox}>Любой</ControlCheckbox>
            <NestedCheckbox
              checked={false}
              className={styles.nestedCheckbox}
              setChecked={setValue}
              name='loadingOnSaturday'
            >
              Сцепки
            </NestedCheckbox>
            <NestedCheckbox
              checked={false}
              setChecked={setValue}
              name='loadingOnSunday'
            >
              Полуприцеп
            </NestedCheckbox>
            <NestedCheckbox
              checked={false}
              setChecked={setValue}
              name='loadingOnSunday'
            >
              Тонар
            </NestedCheckbox>
          </MultiCheckbox>
        </Accordion> */}
        {/*  <Accordion className={styles.accordion} accordionTitle={'Способ погрузки'}>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Маниту</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Зерномет</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Из-под трубы</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Комбайн</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Кун</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Амкодор</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Вертикальный</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Элеватор</Checkbox>
        </Accordion> */}
        <Accordion className={styles.accordion} accordionTitle={'Возможность перегруза'}>
          <Controller
            name="is_overload"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioButton checked={Number(value) == 1} value={1} onChange={onChange}>Да</RadioButton>
            )}
          />
          <Controller
            name="is_overload"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RadioButton checked={Number(value) === 0} value={0} onChange={onChange}>Нет</RadioButton>
            )}
          />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Длина весов (не менее) м'}>
          <Controller
            name="scale_length"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                theme={InputTheme.FILTERS}
                placeholder='Укажите длину'
                value={value}
                onChange={onChange}
                type='number'
              />
            )}
          />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Ограничение по высоте (не менее) м'}>
          <Controller
            name="height_limit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                theme={InputTheme.FILTERS}
                placeholder='Укажите ограничение по высоте'
                value={value}
                onChange={onChange}
                type='number'
              />
            )}
          />
        </Accordion>
        {/* <Accordion className={styles.accordion} accordionTitle={'Дополнительные фильтры'}>
          <Accordion className={styles.accordion} accordionTitle={'Тип выгрузки'}>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Боковая</Checkbox>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Задняя</Checkbox>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Самосвальная задняя</Checkbox>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Самосвальная боковая</Checkbox>
          </Accordion> */}
        <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Грузят в выходные'}>
          <MultiCheckbox>
            <ControlCheckbox className={styles.controlCheckbox}>Грузят в выходные</ControlCheckbox>
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
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Хартия'}>
          <Accordion className={styles.accordion} accordionTitle={'Возможность перегруза'}>
            <Controller
              name="is_full_charter"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton checked={Number(value) == 1} value={1} onChange={onChange}>Полная</RadioButton>
              )}
            />
            <Controller
              name="is_full_charter"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton checked={Number(value) === 0} value={0} onChange={onChange}>Не полная</RadioButton>
              )}
            />
          </Accordion>
        </Accordion>
      </div>
      <TogglerCheckbox
        checked={needToSaveFilters}
        setChecked={setNeedToSaveFilters}
        className={styles.saveFilters}
      >
        Сохранить фильтры
      </TogglerCheckbox>
      <div className={styles.footer}>
        <Button
          className={styles.button}
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.SM}
          fullWidth
        >
          Применить фильтры
        </Button>
      </div>
    </CardContainer>
  )
}
