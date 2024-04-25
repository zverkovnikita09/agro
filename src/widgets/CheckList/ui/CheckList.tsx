import cn from 'classnames';
import styles from './CheckList.module.scss'
import { Tab, TabPanel, Tabs } from "@shared/ui/Tabs";
import { ApplicationsList } from "@widgets/ApplicationsList";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { NotFoundBlock } from "@shared/ui/NotFoundBlock";


interface CheckListProps {
  className?: string;
}

export const CheckList = (props: CheckListProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.checkList, className)}>
      <Tabs>
        <div className={styles.tabsHeading}>
          <Tab value={0}>Все</Tab>
          <Tab value={1}>С моими откликами</Tab>
        </div>
        <TabPanel value={0}>
          <ApplicationsList />
        </TabPanel>
        <TabPanel value={1}>
          <NotFoundBlock title='Заявок не найдено' additionalText='Вы не взяли ни одной заявки' />
        </TabPanel>
      </Tabs>
    </div>
  )
}
