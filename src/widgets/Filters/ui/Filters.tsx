import cn from 'classnames';
import styles from './Filters.module.scss'
import { Text, TextColor, TextSize, TextWeight } from "@shared/ui/Text";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Accordion } from "@shared/ui/Accordion";
import { InputRange } from "@shared/ui/InputRange";
import { CardContainer } from "@shared/ui/CardContainer";
import { useForm } from "react-hook-form";
import { Select, SelectTheme } from "@shared/ui/Select";
import { useLocation } from "react-router-dom";
import { Checkbox } from "@shared/ui/Checkbox";
import { RadioButton } from "@shared/ui/RadioButton";
import { Input, InputTheme } from "@shared/ui/Input";
import { ControlCheckbox, MultiCheckbox, NestedCheckbox } from "@shared/ui/MultiCheckbox";
import { useEffect } from "react";
import { TogglerCheckbox } from "@shared/ui/TogglerCheckbox";

interface FiltersProps {
  className?: string;
  isOpen: boolean;
  closeFilters: () => void;
}

export const Filters = (props: FiltersProps) => {
  const { className, isOpen, closeFilters } = props;
  const location = useLocation();

  const { setValue, watch } = useForm();
  const from = watch('from');
  const to = watch('to');

  useEffect(() => {
    closeFilters();
  }, [location]);

  return (
    <CardContainer className={cn(styles.filters, className, { [styles.activeFilter]: isOpen })}>
      <div className={styles.heading}>
        <Text size={TextSize.XL} weight={TextWeight.SEMI_BOLD}>
          Фильтры
        </Text>
        <Button>
          <Text size={TextSize.S} weight={TextWeight.MEDIUM} color={TextColor.GREY}>
            Очистить все
          </Text>
        </Button>
      </div>
      <div className={styles.body}>
        <Accordion className={styles.accordion} accordionTitle={'Расстояние'}>
          <InputRange
            setValue={setValue}
            value={[from, to]}
            names={{ from: 'from', to: 'to' }}
            min={0}
            max={10000}
            step={500}
            units='км'
            prevValueTextFrom='от'
            prevValueTextTo='до'
          />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Область погрузки'}>
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите одну или несколько' options={[]} value={''} setValue={() => { }} />
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите район(ы)' options={[]} value={''} setValue={() => { }} />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Область выгрузки'}>
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите одну или несколько' options={[]} value={''} setValue={() => { }} />
          <Select theme={SelectTheme.FILTERS} placeholder='Выберите район(ы)' options={[]} value={''} setValue={() => { }} />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Отображать новые территории'}>
          <RadioButton>Да</RadioButton>
          <RadioButton>Нет</RadioButton>
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Культура'}>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Пшеница</Checkbox>
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Стоимость перевозки'}>
          <div className={styles.inputRow}>
            <Input theme={InputTheme.FILTERS} placeholder='От' />
            <Input theme={InputTheme.FILTERS} placeholder='До' />
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
        <Accordion className={styles.accordion} accordionTitle={'Таймслот'}>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Целевой</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>В общем доступе</Checkbox>
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
        <Accordion className={styles.accordion} accordionTitle={'Способ погрузки'}>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Маниту</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Зерномет</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Из-под трубы</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Комбайн</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Кун</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Амкодор</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Вертикальный</Checkbox>
          <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Элеватор</Checkbox>
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Возможность перегруза'}>
          <RadioButton>Да</RadioButton>
          <RadioButton>Нет</RadioButton>
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Длина весов (не менее) м'}>
          <Input theme={InputTheme.FILTERS} placeholder='Укажите длину' />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Ограничение по высоте (не менее) м'}>
          <Input theme={InputTheme.FILTERS} placeholder='Укажите длину' />
        </Accordion>
        <Accordion className={styles.accordion} accordionTitle={'Дополнительные фильтры'}>
          <Accordion className={styles.accordion} accordionTitle={'Тип выгрузки'}>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Боковая</Checkbox>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Задняя</Checkbox>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Самосвальная задняя</Checkbox>
            <Checkbox checked={false} setChecked={setValue} name={'wheat'}>Самосвальная боковая</Checkbox>
          </Accordion>
          {/* <Accordion className={cn(styles.accordion, styles.checkboxContainer)} accordionTitle={'Грузят в выходные'}>
            <Checkbox className={styles.controlCheckbox} checked={false} setChecked={setValue} name={'wheat'}>Нет</Checkbox>
            <MultiCheckbox>
              <ControlCheckbox className={styles.controlCheckbox}>Да</ControlCheckbox>
              <NestedCheckbox
                checked={false}
                className={styles.nestedCheckbox}
                setChecked={setValue}
                name='loadingOnSaturday'
              >
                СБ
              </NestedCheckbox>
              <NestedCheckbox
                checked={false}
                setChecked={setValue}
                name='loadingOnSunday'
              >
                ВС
              </NestedCheckbox>
            </MultiCheckbox>
          </Accordion> */}
          <Accordion className={styles.accordion} accordionTitle={'Хартия'}>
            <RadioButton>Полная</RadioButton>
            <RadioButton>Не полная</RadioButton>
          </Accordion>
        </Accordion>
      </div>
      <TogglerCheckbox className={styles.saveFilters}>Сохранить фильтры</TogglerCheckbox>
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
