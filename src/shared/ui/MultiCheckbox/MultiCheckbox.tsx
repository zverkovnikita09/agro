import { Children, Dispatch, PropsWithChildren, createContext, isValidElement, useMemo, useState } from 'react';
import { CheckboxProps } from '../Checkbox';

interface MultiCheckboxContext {
  status: "not-checked" | "some-checked" | "all-checked",
  childrenProps: CheckboxProps[];
  setNestedValues: Dispatch<React.SetStateAction<{
    name: string;
    checked: boolean;
  }[]>>
  hideNested?: boolean
}

export const MultiCheckboxContext = createContext<MultiCheckboxContext>({ status: "not-checked", childrenProps: [], setNestedValues: () => { } })

interface MultiCheckboxProps {
  hideNested?: boolean
}

export const MultiCheckbox = (props: PropsWithChildren<MultiCheckboxProps>) => {
  const { children, hideNested } = props;

  const childrenProps = useMemo<CheckboxProps[]>(
    () =>
      Children.toArray(children).reduce<CheckboxProps[]>(
        (prev, child) =>
          isValidElement<CheckboxProps>(child) ? [...prev, { ...child.props }] : prev,
        [],
      ),
    [children],
  );

  const [nestedValues, setNestedValues] = useState<{ name: string, checked: boolean }[]>(
    childrenProps
      .filter(({ name }) => name)
      .map(({ checked, name }) => ({ name, checked }))
  );

  const status = useMemo<"not-checked" | "some-checked" | "all-checked">(() => {
    const value = nestedValues?.filter(({ checked }) => !!checked);

    if (value?.length === nestedValues?.length) return "all-checked"
    if (value?.length) return "some-checked"
    return "not-checked";

  }, [nestedValues])

  return (
    <MultiCheckboxContext.Provider value={{ status, childrenProps, setNestedValues, hideNested }}>
      {children}
    </MultiCheckboxContext.Provider>
  )
}
