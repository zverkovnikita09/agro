import { Nullable } from "@shared/lib/globalTypes";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface TabsContext {
  value: Nullable<number>;
  setValue: (value: number) => void;
}

export const TabsContext = createContext<TabsContext>({
  value: null,
  setValue: () => { },
});

interface TabsProps {
  defaultValue?: number
  saveInParams?: boolean
  paramKey?: string;
}

export const Tabs = ({ children, defaultValue = 0, saveInParams, paramKey = 'tab' }: PropsWithChildren<TabsProps>) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState<number>(
    saveInParams ?
      (Number(searchParams.get(paramKey)) || defaultValue) :
      defaultValue);

  useEffect(() => {
    if (saveInParams) {
      setSearchParams(prev => {
        if (value !== defaultValue) prev.set(paramKey, String(value))
        if (value === defaultValue) prev.delete(paramKey)
        return prev;
      })
    }
  }, [value, saveInParams])

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}
