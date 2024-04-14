import cn from 'classnames';
import styles from './SortBy.module.scss'
import { CardContainer } from "@shared/ui/CardContainer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@shared/ui/Button";
import { setSortBy, sortByNames, SortBySelectors, SortByValues } from "@entities/SortBy";
import { useDispatch, useSelector } from "react-redux";

interface SortByProps {
  className?: string;
  isOpen: boolean;
  closeSorting: () => void;
}

export const SortBy = (props: SortByProps) => {
  const { className, isOpen, closeSorting } = props;
  const dispatch = useDispatch();
  const selectedSorting = useSelector(SortBySelectors.selectSortByValue)

  const handleSortChange = (newSortBy: SortByValues) => {
    dispatch(setSortBy(newSortBy))
    closeSorting();
  };

  const location = useLocation();

  useEffect(() => {
    closeSorting();
  }, [location]);

  if (!isOpen) return null

  return (
    <CardContainer className={cn(styles.sortBy, className)}>
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
