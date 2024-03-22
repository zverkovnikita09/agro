import {PropsWithChildren, useContext} from "react";
import {TabsContext} from "./Tabs";

interface TabPanelProps {
  value: number;
}
export const TabPanel = ({value, children}: PropsWithChildren<TabPanelProps>) => {
  const {value: contextValue} = useContext(TabsContext);

  if (value !== contextValue) return null;

  return children;
};