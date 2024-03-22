import cn from 'classnames';
import styles from './Application.module.scss'
import {Title, TitleSize} from "@shared/ui/Title";

interface ApplicationProps {
  className?: string;
  id: number
}

export const Application = (props: ApplicationProps) => {
  const { className, id } = props;

  return (
    <div className={cn(styles.application, className)}>
      <div className={styles.application__content}>
        <div>
          <Title size={TitleSize.APPLICATION_TITLE}>
            Заявка №{id}
          </Title>
          <p>

            от: 06.03.2024
          </p>
          <div>
            Сроки: 06.03.2024-05.15.2024
          </div>
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
      <div className={styles.application__footer}>

      </div>

    </div>
  )
}
