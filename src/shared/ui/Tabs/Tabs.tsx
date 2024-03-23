import {createContext, PropsWithChildren, useState} from "react";

interface TabsContext {
  value: number;
  setValue: (value: number) => void;
}

export const TabsContext = createContext<TabsContext>({
  value: null,
  setValue: () => {},
});

interface TabsProps {
  defaultValue?: number
}

export const Tabs = ({children, defaultValue}: PropsWithChildren<TabsProps>) => {
  const [value, setValue] = useState<number>(defaultValue ?? 0);

  return (
    <TabsContext.Provider value={{value, setValue}}>
      {children}
    </TabsContext.Provider>
  )
}
