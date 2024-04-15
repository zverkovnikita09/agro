import cn from 'classnames';
import {Text, TextColor, TextSize, TextWeight} from "@shared/ui/Text";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {Accordion} from "@shared/ui/Accordion";
import {InputRange} from "@shared/ui/InputRange";
import {CardContainer} from "@shared/ui/CardContainer";
import {Controller, useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import {Checkbox} from "@shared/ui/Checkbox";
import {RadioButton} from "@shared/ui/RadioButton";
import {Input, InputTheme} from "@shared/ui/Input";
import {ControlCheckbox, MultiCheckbox, NestedCheckbox} from "@shared/ui/MultiCheckbox";
import {useEffect, useState} from "react";
import {TogglerCheckbox} from "@shared/ui/TogglerCheckbox";
import {useLocalStorage} from '@shared/hook/useLocalStorage';
import {LSKeys} from '@shared/lib/globalVariables';
import {Filters as FiltersType} from '../model/Filters.model';
import {useDispatch, useSelector} from 'react-redux';
import {FiltersSelectors} from '../model/Filters.selectors';
import {useGetData} from '@shared/hook/useGetData';
import {setFilters} from '../model/Filters.slice';
import {LoadingBlock} from '@shared/ui/LoadingBlock';
import styles from './Filters.module.scss'

interface FiltersProps {
  className?: string;
  isOpen: boolean;
  closeFilters: () => void;
}

export const Filters = (props: FiltersProps) => {
  const { className, isOpen, closeFilters } = props;
  const location = useLocation();
  const [needToSaveFilters, setNeedToSaveFilters] = useState(Boolean(JSON.parse(localStorage.getItem(LSKeys.FILTERS) as string)));
  const allFilters = useSelector(FiltersSelectors.selectAllFilters);
  const [searchUnloadRegion, setSearchUnloadRegion] = useState('');
  const [searchLoadRegion, setSearchLoadRegion] = useState('');

  useEffect(() => {
    closeFilters();
  }, [location]);

  const [, setLSFilters] = useLocalStorage(LSKeys.FILTERS, null)
  const { control, watch, setValue, reset, handleSubmit } = useForm<FiltersType>({
    /* defaultValues: allFilters, */
  })
  const distance_from = watch('distance_from');
  const distance_to = watch('distance_to');
  const dispatch = useDispatch()

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

  const { data: regions, isSuccess: isRegionsSuccess } = useGetData<{load_regions: string[], unload_regions: string[]}>(
    {
      url: '/api/v1/orders/regions',
      dataFlag: true,
      withAuthToken: true,
    })

  const timeslot = watch("timeslot");
  const load_types = watch("load_types");
  const load_method = watch("load_method");
  const crop = watch("crop");
  const unload_methods = watch("unload_methods");

  const load_region = watch("load_region");
  const unload_region = watch("unload_region");
  const load_city = watch("load_city");
  const unload_city = watch("unload_city");

  //Грузят в выходные
  const [saturdayState, setSaturdayState] = useState(allFilters.clarification_of_the_weekend?.includes('суббота') || '');
  const [sundayState, setSundayState] = useState(allFilters.clarification_of_the_weekend?.includes('воскресенье') || '');

  useEffect(() => {
    setValue("clarification_of_the_weekend", [saturdayState, sundayState].filter(Boolean).join(" и "))
  }, [saturdayState, sundayState])

  /* const [newRegions, setNewRegions] = useLocalStorage(LSKeys.NEW_REGIONS, null); */

  const onSubmit = (data: FiltersType) => {
    closeFilters()
    dispatch(setFilters(data))
    setLSFilters(needToSaveFilters ? data : null)
    /* setNewRegions() */
  }

  const handleFiltersReset = () => {
    reset({
      clarification_of_the_weekend: undefined,
      crop: undefined,
      distance_from: undefined,
      distance_to: undefined,
      is_full_charter: undefined,
      is_overload: undefined,
      load_method: undefined,
      load_region: undefined,
      load_types: undefined,
      scale_length: undefined,
      tariff_from: undefined,
      tariff_to: undefined,
      timeslot: undefined,
      unload_methods: undefined,
      unload_region: undefined
    })
    setSundayState("")
    setSaturdayState("")
  }

  return (
    <CardContainer className={cn(styles.filters, className, { [styles.open]: isOpen })}>
      {
        (!isRegionsSuccess || !isOptionsSuccess) && <div className={styles.loading}><LoadingBlock /></div>
      }
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.heading}>
          <Text size={TextSize.XL} weight={TextWeight.SEMI_BOLD}>
            Фильтры
          </Text>
          <Button onClick={handleFiltersReset}>
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
          <Accordion className={styles.accordion} accordionTitle={'Регион погрузки'} maxContentHeight={360}>
            <Input
              value={searchLoadRegion}
              onChange={e => setSearchLoadRegion(e.target.value)}
              theme={InputTheme.FILTERS}
              placeholder="Поиск..."
              className={styles.searchInput}
            />
            {Object.values(regions?.load_regions || {}).filter(region => region.toUpperCase().includes(searchLoadRegion.toUpperCase())).map((item, index) => (
              <Checkbox
                key={item}
                checked={!!load_region?.[index]}
                setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? item : "")}
                name={`load_region.${index}`}
              >
                {item}
              </Checkbox>
            ))}
          </Accordion>
          <Accordion className={styles.accordion} accordionTitle={'Регион выгрузки'} maxContentHeight={360}>
            <Input
              value={searchUnloadRegion}
              onChange={e => setSearchUnloadRegion(e.target.value)}
              theme={InputTheme.FILTERS}
              placeholder="Поиск..."
              className={styles.searchInput}
            />
            {Object.values(regions?.unload_regions || {}).filter(region => region.toUpperCase().includes(searchUnloadRegion.toUpperCase())).map((item, index) => (
              <Checkbox
                key={item}
                checked={!!unload_region?.[index]}
                setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? item : "")}
                name={`unload_region.${index}`}
              >
                {item}
              </Checkbox>
            ))}
          </Accordion>
          {/* <Accordion className={styles.accordion} accordionTitle={'Область выгрузки'}>
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите одну или несколько' options={[]} value={''} setValue={() => { }} />
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите район(ы)' options={[]} value={''} setValue={() => { }} />
        </Accordion> */}
          {/* <Accordion className={styles.accordion} accordionTitle={'Отображать новые территории'}>
            <RadioButton checked={Number(newRegions) == 1} value={1} onChange={() => setNewRegions(1)}>Да</RadioButton>
            <RadioButton checked={Number(newRegions) === 0} value={0} onChange={() => setNewRegions(0)}>Нет</RadioButton>
          </Accordion> */}
          <Accordion className={styles.accordion} accordionTitle={'Культура'} maxContentHeight={360}>
            {options?.crop.map((item, index) => (
              <Checkbox
                key={item}
                checked={!!crop?.[index]}
                setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? item : "")}
                name={`crop.${index}`}
              >
                {item}
              </Checkbox>
            ))}
          </Accordion>
          <Accordion className={styles.accordion} accordionTitle={'Стоимость перевозки'}>
            <div className={styles.inputRow}>
              <Controller
                name="tariff_from"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input
                      theme={InputTheme.FILTERS}
                      placeholder='От'
                      value={value}
                      onChange={onChange}
                      type='number'
                    />
                  )
                }}
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
          {/* <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Отображать цену (НДС/б.НДС)'}>
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
              {options?.timeslot.map((item, index) => (
                <NestedCheckbox
                  key={item}
                  checked={!!timeslot?.[index]}
                  className={styles.nestedCheckbox}
                  setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? item : "")}
                  name={`timeslot.${index}`}
                >
                  {item}
                </NestedCheckbox>
              ))}
            </MultiCheckbox>
          </Accordion>
          <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Тип транспорта'}>
            <MultiCheckbox>
              <ControlCheckbox className={styles.controlCheckbox}>Любой</ControlCheckbox>
              {options?.load_types.map(({ id, title }, index) => (
                <NestedCheckbox
                  key={id}
                  checked={!!load_types?.[index]}
                  className={styles.nestedCheckbox}
                  setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? id : "")}
                  name={`load_types.${index}`}
                >
                  {title}
                </NestedCheckbox>
              ))}
            </MultiCheckbox>
          </Accordion>
          <Accordion className={styles.accordion} accordionTitle={'Способ погрузки'}>
            {options?.load_methods.map((item, index) => (
              <Checkbox
                key={item}
                checked={!!load_method?.[index]}
                setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? item : "")}
                name={`load_method.${index}`}
              >
                {item}
              </Checkbox>
            ))}
          </Accordion>
          <Accordion className={styles.accordion} accordionTitle={'Возможность перегруза'}>
            <Controller
              name="is_overload"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton checked={value === undefined} onChange={() => onChange(undefined)}>Не указано</RadioButton>
              )}
            />
            <Controller
              name="is_overload"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton checked={value === 1} onChange={() => onChange(1)}>Да</RadioButton>
              )}
            />
            <Controller
              name="is_overload"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioButton checked={value === 0} onChange={() => onChange(0)}>Нет</RadioButton>
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
          <Accordion
            className={styles.accordion}
            accordionTitle={'Дополнительные фильтры'}
            classes={
              {
                contentWrapper: styles.additionalContentWrapper,
                content: styles.additionalContent
              }
            }
          >
            <Accordion className={styles.accordion} accordionTitle={'Тип выгрузки'}>
              {options?.unload_methods.map(({ id, title }, index) => (
                <Checkbox
                  key={id}
                  checked={!!unload_methods?.[index]}
                  className={styles.nestedCheckbox}
                  setChecked={(name, checked) => setValue(name as keyof FiltersType, checked ? id : "")}
                  name={`unload_methods.${index}`}
                >
                  {title}
                </Checkbox>
              ))}
            </Accordion>
            <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Грузят в выходные'}>
              <MultiCheckbox>
                <ControlCheckbox className={styles.controlCheckbox}>Грузят в выходные</ControlCheckbox>
                <NestedCheckbox
                  checked={!!saturdayState}
                  className={styles.nestedCheckbox}
                  setChecked={(_, checked) => setSaturdayState(checked ? 'суббота' : '')}
                  name='saturday'
                >
                  СБ
                </NestedCheckbox>
                <NestedCheckbox
                  checked={!!sundayState}
                  setChecked={(_, checked) => setSundayState(checked ? 'воскресенье' : '')}
                  name='sunday'
                >
                  ВС
                </NestedCheckbox>
              </MultiCheckbox>
            </Accordion>
            <Accordion className={styles.accordion} accordionTitle={'Хартия'}>
              <Controller
                name="is_full_charter"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioButton checked={value === undefined} onChange={() => onChange(undefined)}>Не указано</RadioButton>
                )}
              />
              <Controller
                name="is_full_charter"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioButton checked={value === 1} onChange={() => onChange(1)}>Полная</RadioButton>
                )}
              />
              <Controller
                name="is_full_charter"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioButton checked={value  === 0} onChange={() => onChange(0)}>Не полная</RadioButton>
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
            type='submit'
            fullWidth
          >
            Применить фильтры
          </Button>
        </div>
      </form>
    </CardContainer>
  )
}
