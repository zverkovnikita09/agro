import cn from 'classnames';
import styles from './SortBy.module.scss'
import {CardContainer} from "@shared/ui/CardContainer";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Button} from "@shared/ui/Button";
import {setSortBy, sortByNames, SortByValues} from "@entities/SortBy";
import {useDispatch} from "react-redux";

interface SortByProps {
  className?: string;
  isOpen: boolean;
  closeSorting: () => void;
}

export const SortBy = (props: SortByProps) => {
  const { className, isOpen, closeSorting } = props;
  const dispatch = useDispatch();

  const handleSortChange = (newSortBy: SortByValues) => {
    dispatch(setSortBy(newSortBy))
    closeSorting();
  };

  const location = useLocation();

  useEffect(() => {
    closeSorting();
  }, [location]);


  return (
    <CardContainer className={cn(styles.sortBy, className, { [styles.activeSorting]: isOpen })}>
      {Object.entries(sortByNames).map(([key, value])=>(
        <Button className={styles.button} onClick={() => handleSortChange(key as SortByValues)} fullWidth>{value}</Button>
      ))}
    </CardContainer>
  )
}
