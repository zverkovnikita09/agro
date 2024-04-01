import cn from 'classnames';
import styles from './ApplicationsList.module.scss'
import {Application} from '@entities/Application';
import {useGetData} from "@shared/hook/useGetData";
import {ApplicationModel} from "@entities/Application/model/application.model";
import {LoadingBlock} from "@shared/ui/LoadingBlock";
import {NotFoundBlock} from "@shared/ui/NotFoundBlock";
import {StatusType} from "@shared/ui/StatusBadge";

interface ApplicationsListProps {
  className?: string;
  status: string;
}

export const ApplicationsList = (props: ApplicationsListProps) => {
  const { className, status } = props;

  const {data: applications, isError, isLoading} = useGetData<ApplicationModel[]>({url: '/api/v1/orders', dataFlag: true});

  if (isLoading) return <LoadingBlock />

  if (!applications?.length) return <NotFoundBlock title='Заявок не найдено' additionalText='Вы не взяли ни одной заявки'/>

  return (
    <div className={cn(styles.applicationsList, className)}>
      {applications?.map(({ id, ...props }, index) => (
        <Application
          id={id}
          key={id}
          status={StatusType.ACTIVE}
          {...props}
          order_number={index + 1}
        />
        )
      )}
    </div>
  )
}
