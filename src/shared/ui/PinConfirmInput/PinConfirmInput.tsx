import cn from 'classnames';
import styles from './PinConfirmInput.module.scss'
import { useEffect, useRef, useState } from 'react';
import { Input } from '../Input';

interface PinConfirmInputProps {
  className?: string;
  cellCount?: number;
  value: string;
  setValue: (value: string) => void;
  name: string;
}

export const PinConfirmInput = (props: PinConfirmInputProps) => {
  const { className, cellCount = 4, setValue, value = '', name } = props;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    labelRef?.current?.click();
  }, [labelRef])

  return (
    <label className={cn(styles.pinConfirmInput, className)} ref={labelRef}>
      <Input
        wrapperClassName='hiddenInput'
        mask={[...Array(cellCount)].map(() => '9').join("")}
        type='tel'
        maskChar=''
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete='off'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {[...Array(cellCount)].map((_, index) => (
        <div key={index} className={cn(styles.inputCell, { [styles.active]: focus && index === value.length })}>        
          {value?.[index] ?? ''}
        </div>
      ))}
    </label>
  )
}
