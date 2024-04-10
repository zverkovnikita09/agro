import cn from 'classnames';
import styles from './YandexMap.module.scss'

interface YandexMapProps {
  className?: string;
}

export const YandexMap = (props: YandexMapProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.yandexMap, className)}>
      <iframe className={styles.map}
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A092c91191bf318e7ef6c8d42a695041151c46080253a6e3101f230ae4bbe8988&amp;source=constructor"
        width="100%" height="100%" frameBorder="0" />
    </div>
  )
}
