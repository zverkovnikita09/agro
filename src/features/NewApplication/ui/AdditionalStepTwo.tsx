import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Select } from '@shared/ui/Select'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import ArrowLeft from '@images/arrow-full-left.svg'
import { MultiCheckbox, NestedCheckbox, ControlCheckbox } from '@shared/ui/MultiCheckbox'
import { useForm } from 'react-hook-form'
import { RadioButton } from '@shared/ui/RadioButton'
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'

interface AdditionalStepOneProps {
  prevStep: () => void
  toMainPart: () => void
}

export const AdditionalStepTwo = (props: AdditionalStepOneProps) => {
  const { toMainPart, prevStep } = props;

  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  /* const cargo_price = watch('unl') */ // тип выгрузки
  const load_place = watch('work_time') // время
  const approach = watch('approach') // подъезд
  const is_load_in_weekend = watch("is_load_in_weekend"); //грузят ли в выходные
  const clarification_of_the_weekend = watch("clarification_of_the_weekend") //Сб Вс или СБ и ВС
  const charter = watch("charter")

  /*   const loadingOnSaturday = watch("loadingOnSaturday");
  const loadingOnSunday = watch("loadingOnSunday"); */

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
          {/* <MultiCheckbox hideNested>
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
          </MultiCheckbox> */}
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