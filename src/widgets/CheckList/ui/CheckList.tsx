import cn from 'classnames';
import styles from './CheckList.module.scss'
import {Tab, TabPanel, Tabs} from "@shared/ui/Tabs";
import {ApplicationsList} from "@widgets/ApplicationsList";


interface CheckListProps {
  className?: string;
}

export const CheckList = (props: CheckListProps) => {
  const {className} = props;

  return (
    <div className={cn(styles.checkList, className)}>
      <Tabs>
        <div className={styles.tabsHeading}>
          <Tab value={0}>Все</Tab>
          <Tab value={1}>Активные</Tab>
          <Tab value={2}>На паузе</Tab>
        </div>
        <TabPanel value={0}>
          <ApplicationsList applications={[{id:1},{id:2}]} />
        </TabPanel>
        <TabPanel value={1}>Активные заявки</TabPanel>
        <TabPanel value={2}>На паузе</TabPanel>
      </Tabs>
    </div>
  )
}
