import cn from 'classnames';
import styles from './ViewCount.module.scss'
import Eye from "@images/eye.svg";
import {Text, TextSize, TextWeight} from "@shared/ui/Text";

interface ViewCountProps {
  className?: string;
  views: number;
}

export const ViewCount = (props: ViewCountProps) => {
  const { className, views } = props;

  return (
    <div className={cn(styles.viewCount, className)}>
        <Eye width={18} height={18} />
        <Text size={TextSize.M} weight={TextWeight.MEDIUM}>{views}</Text>
    </div>
  )
}
