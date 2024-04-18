import styles from './YandexMap.module.scss'
import {Text, TextSize, TextWeight} from "@shared/ui/Text";

export const MarkWithContent = () => {
  return(
    <div className={styles.markWithContent}>
      <div className={styles.mark} />
      <div className={styles.markContent}>
        <Text size={TextSize.S} weight={TextWeight.MEDIUM}>1500 Р/Т</Text>
      </div>
    </div>
  )
}