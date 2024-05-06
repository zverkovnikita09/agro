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

export const Tabs = ({ children, defaultValue, saveInParams }: PropsWithChildren<TabsProps>) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState<number>(defaultValue ?? (Number(searchParams.get("tab")) || 0));

  useEffect(() => {
    if (saveInParams) {
      setSearchParams(prev => {
        if (value) prev.set("tab", String(value))
        if (!value) prev.delete("tab")
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
