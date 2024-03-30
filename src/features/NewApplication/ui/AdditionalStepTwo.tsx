import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Select } from '@shared/ui/Select'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import ArrowLeft from '@images/arrow-full-left.svg'
import { MultiCheckbox, NestedCheckbox, ControlCheckbox } from '@shared/ui/MultiCheckbox'
import { useForm } from 'react-hook-form'
import { InputRange } from '@shared/ui/InputRange'

interface AdditionalStepOneProps {
  prevStep: () => void
  toMainPart: () => void
}

export const AdditionalStepTwo = (props: AdditionalStepOneProps) => {
  const { toMainPart, prevStep } = props;

  const { setValue, watch } = useForm();

  const loadingOnSaturday = watch("loadingOnSaturday");
  const loadingOnSunday = watch("loadingOnSunday");

  const from = watch("from");
  const to = watch("to");

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Тип выгрузки
        </Text>
        <Select placeholder='Выберите тип выгрузки' options={[]} value={''} setValue={() => { }} />
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Стоимость груза
        </Text>
        <Input placeholder='Укажите стоимость груза ₽/Т' />
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Время работы
        </Text>
        <div className={styles.inputsRow}>
          <Input placeholder='Длина весов' />
          <Input placeholder='Ограничение по высоте' />
        </div>
        <div className={styles.inputsRow}>
          <MultiCheckbox hideNested>
            <ControlCheckbox>Все</ControlCheckbox>
            <NestedCheckbox
              checked={loadingOnSaturday}
              className={styles.nestedCheckbox}
              setChecked={setValue}
              name='loadingOnSaturday'
            >
              СБ
            </NestedCheckbox>
            <NestedCheckbox
              checked={loadingOnSunday}
              setChecked={setValue}
              name='loadingOnSunday'
            >
              ВС
            </NestedCheckbox>
          </MultiCheckbox>
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Где происходит погрузка
        </Text>
        <Input placeholder='Где будет осуществляться погрузка' />
        <InputRange
          names={{ from: 'from', to: 'to' }}
          setValue={setValue}
          value={[from, to]}
          step={500}
          max={10000}
          min={0}
          units='км'
          prevValueTextFrom='от'
          prevValueTextTo='до'
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button className={styles.additionalButton} onClick={toMainPart}>
          <ArrowLeft />
          Основные параметры заявки
        </Button>
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
        >
          Создать заявку
        </Button>
      </div>
    </>
  )
}