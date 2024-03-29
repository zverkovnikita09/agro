import styles from './NotFoundPage.module.scss'
import truck from '@images/truck-404.png'
import { Title } from '@shared/ui/Title';
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className={styles.notFoundPage}>
    <img src={truck} alt="Грузовой автомобиль" />
    <Title className={styles.title}>Упс!</Title>
    <Text
      size={TextSize.XL}
      color={TextColor.GREY}
      weight={TextWeight.SEMI_BOLD}
    >
      Страница не найдена
    </Text>
    <Button
      as={Link}
      to='/'
      theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
      size={ButtonSize.M}
      className={styles.button}
    >
      На главную
    </Button>
  </div>
)
