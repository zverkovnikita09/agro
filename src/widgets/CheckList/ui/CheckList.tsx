import cn from 'classnames';
import styles from './CheckList.module.scss'
import { Tab, TabPanel, Tabs } from "@shared/ui/Tabs";
import { ApplicationsList } from "@widgets/ApplicationsList";
import { useSelector } from 'react-redux';
import { Role, UserSelectors } from '@entities/User';


interface CheckListProps {
  className?: string;
}

export const CheckList = (props: CheckListProps) => {
  const { className } = props;

  const userRole = useSelector(UserSelectors.selectUserRole);

  if (userRole === Role.LOGIST) return (
    <div className={cn(styles.checkList, className, styles.logist)}>
      <ApplicationsList />
    </div>
  )

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
