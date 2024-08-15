import cn from 'classnames';
import styles from './SortByDocsList.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setSortBy, sortByNames, SortBySelectors, SortByValues} from "@entities/SortBy";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {CardContainer} from "@shared/ui/CardContainer";
import {Button} from "@shared/ui/Button";

interface SortByDocsListProps {
  className?: string;
  setDocsSort: (value: string) => void
  value: string
}

export const SortByDocsList = (props: SortByDocsListProps) => {
  const { className, setDocsSort, value } = props;
  const dispatch = useDispatch();
  const selectedSorting = useSelector(SortBySelectors.selectSortByValue)

  const [isOpen, setIsOpen] = useState(true);

  const handleSortChange = (newSortBy: SortByValues) => {
    dispatch(setSortBy(newSortBy))
    setIsOpen(false);
  };

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  if (!isOpen) return null

  return (
    <CardContainer className={cn(styles.sortByDocsList, className)}>
      {Object.entries(sortByNames).map(([key, value]) => (
        <Button
          className={cn(styles.button, { [styles.active]: key === selectedSorting })}
          onClick={() => handleSortChange(key as SortByValues)}
          key={key}
          fullWidth
        >
          {value}
        </Button>
      ))}
    </CardContainer>
  )
}
