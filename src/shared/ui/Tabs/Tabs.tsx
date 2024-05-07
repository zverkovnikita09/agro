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
}

export const Tabs = ({ children, defaultValue = 0, saveInParams }: PropsWithChildren<TabsProps>) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState<number>(Number(searchParams.get("tab")) || defaultValue);

  useEffect(() => {
    if (saveInParams) {
      setSearchParams(prev => {
        if (value !== defaultValue) prev.set("tab", String(value))
        if (value === defaultValue) prev.delete("tab")
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
