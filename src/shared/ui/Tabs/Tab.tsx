import { PropsWithChildren, useContext, useEffect, useLayoutEffect } from "react";
import { TabsContext } from "./Tabs";
import { Button } from "@shared/ui/Button";
import styles from './Tabs.module.scss';
import cn from "classnames";

interface TabProps {
  value: number;
}

export const Tab = ({ value, children }: PropsWithChildren<TabProps>) => {
  const { setValue, value: contextValue } = useContext(TabsContext);

  return (
    <Button className={cn(styles.tab, { [styles.selected]: contextValue === value })} onClick={() => setValue(value)}>
      {children}
    </Button>
  );
};
