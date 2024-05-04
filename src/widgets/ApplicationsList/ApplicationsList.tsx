import cn from 'classnames';
import styles from './ApplicationsList.module.scss'
import { Application } from '@entities/Application';
import { useGetData } from "@shared/hook/useGetData";
import { ApplicationModel } from "@entities/Application/model/application.model";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { NotFoundBlock } from "@shared/ui/NotFoundBlock";
import { StatusType } from "@shared/ui/StatusBadge";
import { useSelector } from "react-redux";
import { SortBySelectors } from "@entities/SortBy";
import { FiltersSelectors } from "@entities/Filters";
import { useMemo } from 'react';

interface ApplicationsListProps {
  className?: string;
  type?: "all" | "withMyResponses"
  noApplicationText?: string
}

export const ApplicationsList = (props: ApplicationsListProps) => {
  const { className, type, noApplicationText } = props;
  const sortBy = useSelector(SortBySelectors.selectSortByValue);
  const filters = useSelector(FiltersSelectors.selectAllFilters);

  const queryUrl = useMemo(() => {
    if (type === "withMyResponses") return "/api/v1/user-orders"
    return "/api/v1/orders"
  }, [type])

  const { data: applications, isError, isLoading } = useGetData<ApplicationModel[]>(
    {
      url: queryUrl,
      dataFlag: true,
      params: { sort: sortBy, ...filters },
      withAuthToken: true
    });

  if (isLoading) return <LoadingBlock />

  if (!applications?.length) return <NotFoundBlock title='Заявок не найдено' additionalText={noApplicationText} />

  return (
    <div className={cn(styles.applicationsList, className)}>
      {applications?.map(({ id, order_number, ...props }) => (
        <Application
          id={id}
          key={id}
          /* status={StatusType.ACTIVE} */
          {...props}
          withMyResponse={type === "withMyResponses"}
          order_number={order_number}
        />
      )
      )}
    </div>
  )
}
