import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import styles from './NewApplication.module.scss'
import { Input } from '@shared/ui/Input'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import ArrowLeft from '@images/arrow-full-left.svg'
import { useContext } from 'react'
import { NewApplicationContext } from './NewApplication'

interface AdditionalStepOneProps {
  toMainPart: () => void
}

export const AdditionalStepOne = (props: AdditionalStepOneProps) => {
  const { toMainPart } = props;

  const { control, watch, setValue, register } = useContext(NewApplicationContext);

  const cargo_price = watch('cargo_price') // стоимость груза
  const load_place = watch('load_place') // где происходит погрузка
  const approach = watch('approach') // подъезд


  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Норма недостачи груза
        </Text>
        <div className={styles.inputsRow}>
          <Input placeholder='Укажите %' />
          <Input placeholder='Укажите кг' />
        </div>
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
          onClick={toMainPart}
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