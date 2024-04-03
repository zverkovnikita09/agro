import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import { Checkbox } from '@shared/ui/Checkbox'
import { MultiCheckbox } from '@shared/ui/MultiCheckbox'
import { ControlCheckbox } from '@shared/ui/MultiCheckbox/ControlCheckbox'
import { useForm } from 'react-hook-form'
import { NestedCheckbox } from '@shared/ui/MultiCheckbox/NestedCheckbox'
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'

interface FormStepTwoProps {
  prevStep: () => void
}

export const FormStepTwo = (props: FormStepTwoProps) => {
  const { prevStep } = props;
  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  const crop = watch('crop') // груз
  const volume = watch('volume') //объем
  const tariff = watch('tariff') //тариф без ндс
  const nds_percent = watch('nds_percent');

  const distance = watch('distance'); //расстояние
  const daily_load_rate = watch('daily_load_rate'); //суточ норма погрузки

  const load_types = watch("load_types"); //массив id (чекбоксы)

  const load_method = watch("load_method"); //способ погрузки

  const scale_lenght = watch("scale_lenght"); //длина весов

  const height_limit = watch("height_limit");

  const tolerance_to_the_norm = watch("tolerance_to_the_norm") //допуск к норме

  const is_overload = watch("is_overload") //возможность перегруза

/*   const any = watch("any");
  const scepky = watch("scepky"); */

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Груз и тарифы
        </Text>
        <div className={styles.inputsRow}>
          <div className={styles.inputBlock}>
            <Input placeholder='Выберите груз' />
            <Input placeholder='Тариф за перевозку ₽/Т Без НДС' />
            <Input placeholder='Укажите расстояние перевозки' />
          </div>
          <div className={styles.inputBlock}>
            <Input placeholder='Общий объем груза / Т' />
            <Input placeholder='Укажите ставку НДС %' />
            <Input placeholder='Суточная норма поргрузки / Т' />
          </div>
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Детали погрузки
        </Text>
        <div className={styles.inputsRow}>
          {/* <Checkbox checked={scepky} setChecked={setValue} name='scepky'>Сцепки</Checkbox>
          <Checkbox checked={any} setChecked={setValue} name='any'>Полуприцеп</Checkbox>
          <Checkbox checked={scepky} setChecked={setValue} name='scepky'>Тонар</Checkbox> */}
        </div>
        <div className={styles.inputsRow}>
          <Select placeholder='Способ погрузки' options={[]} value={''} setValue={() => { }} />
          <Input placeholder='Длина весов' />
          <Input placeholder='Ограничение по высоте' />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Допуск к норме
        </Text>
        <div className={styles.inputsRow}>
          <Input placeholder='Укажите допуск к норме %' />
          <Select placeholder='Способ погрузки' options={[]} value={''} setValue={() => { }} />
        </div>
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