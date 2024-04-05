import cn from 'classnames';
import styles from './Stepper.module.scss'
import {createContext, PropsWithChildren} from "react";
import {Nullable} from "@shared/lib/globalTypes";
import {TabsContext} from "@shared/ui/Tabs/Tabs";

interface StepperProps {
  className?: string;
  value: number;
}

interface StepperContext {
  value: number;
}

export const StepperContext = createContext<StepperContext>({
  value: 1,
});

export const Stepper = (props: PropsWithChildren<StepperProps>) => {
  const {
    className,
    value,
    children
  } = props;

  return (
    <div className={cn(styles.stepper, className)}>
      <StepperContext.Provider value={{value}}>
        {children}
      </StepperContext.Provider>
    </div>
  )
}
