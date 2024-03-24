import cn from 'classnames';
import styles from './CheckList.module.scss'
import {Tab, TabPanel, Tabs} from "@shared/ui/Tabs";
import {ApplicationsList} from "@widgets/ApplicationsList";
import {LoadingBlock} from "@shared/ui/LoadingBlock";
import {NotFoundBlock} from "@shared/ui/NotFoundBlock";


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
          <Tab value={3}>Завершенные</Tab>
        </div>
        <TabPanel value={0}>
          <ApplicationsList applications={[{id:1},{id:2},{id:1},{id:2},{id:1},{id:2}]} />
        </TabPanel>
        <TabPanel value={1}>
          <LoadingBlock />
        </TabPanel>
        <TabPanel value={2}>
          <ApplicationsList applications={[{id:5},{id:6}]} />
        </TabPanel>
        <TabPanel value={3}>
          <NotFoundBlock title='Заявок не найдено' additionalText='Вы не взяли ни одной заявки'/>
        </TabPanel>
      </Tabs>
    </div>
  )
}
