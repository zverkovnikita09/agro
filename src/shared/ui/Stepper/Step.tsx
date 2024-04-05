import cn from 'classnames';
import styles from './Stepper.module.scss'
import {PropsWithChildren, useContext} from "react";
import {TabsContext} from "@shared/ui/Tabs/Tabs";
import {StepperContext} from "@shared/ui/Stepper/Stepper";

interface StepProps {
  className?: string;
  value: number;
}

export const Step = (props: PropsWithChildren<StepProps>) => {
  const {
    className,
    value
  } = props;

  const {value: contextValue} = useContext(StepperContext);

  const isActive = value === contextValue;

  const isDone = value < contextValue;

  return (
    <div className={cn(styles.step, {[styles.stepDone]: isDone}, {[styles.stepActive]: isActive},  className)}>
      <div className={cn(styles.stepCount, {[styles.done]: isDone}, {[styles.active]: isActive})}>{value}</div>
    </div>
  )
}
