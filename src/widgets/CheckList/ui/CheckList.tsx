import cn from 'classnames';
import styles from './CheckList.module.scss'
import { Tab, TabPanel, Tabs } from "@shared/ui/Tabs";
import { ApplicationsList } from "@widgets/ApplicationsList";


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
          <ApplicationsList type='withMyResponses' noApplicationText='Вы не взяли ни одной заявки' />
        </TabPanel>
      </Tabs>
    </div>
  )
}
