import { PropsWithChildren, useContext, useEffect } from 'react';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { MultiCheckboxContext } from './MultiCheckbox';
import cn from 'classnames'

export const NestedCheckbox = (props: PropsWithChildren<CheckboxProps>) => {
  const { setNestedValues, hideNested, status } = useContext(MultiCheckboxContext);

  useEffect(() => {
    setNestedValues((prev) => {
      const idx = prev.findIndex(({ name }) => name === props.name)
      return [...prev.slice(0, idx), { ...prev[idx], checked: props.checked }, ...prev.slice(idx + 1)]
    })
  }, [props.checked]);

  return (
    <Checkbox {...props} className={cn(props.className, { 'hidden': hideNested && status === "not-checked" })} />
  )
}