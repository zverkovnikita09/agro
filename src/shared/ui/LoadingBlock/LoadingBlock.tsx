import cn from 'classnames';
import styles from './LoadingBlock.module.scss'
import {Spinner} from "@shared/ui/Spinner";
import {Text, TextSize, TextWeight} from "@shared/ui/Text";

interface LoadingBlockProps {
  className?: string;
}

export const LoadingBlock = (props: LoadingBlockProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.loadingBlock, className)}>
      <div className={styles.container}>
        <Spinner />
        <Text size={TextSize.L} weight={TextWeight.MEDIUM}>Загрузка...</Text>
      </div>
    </div>
  )
}
