import cn from 'classnames';
import styles from './InputRange.module.scss'
import Slider from 'react-slider'
import { Text, TextSize, TextWeight } from '../Text';

interface InputRangeProps {
  className?: string;
  setValue: (name: string, value: number) => void;
  defaultValue?: [number, number];
  value: [number, number];
  min?: number;
  max?: number;
  names: { from: string, to: string },
  step?: number
  units?: string
  prevValueTextFrom?: string
  prevValueTextTo?: string
}

export const InputRange = (props: InputRangeProps) => {
  const {
    className,
    defaultValue,
    max = 10,
    min = 0,
    value: [from = min, to = max],
    setValue,
    names,
    step,
    units,
    prevValueTextFrom,
    prevValueTextTo
  } = props;

  const handleChangeRange = (value: [number, number]) => {
    const [from, to] = value;
    setValue(names.from, from);
    setValue(names.to, to);
  }

  return (
    <div className={cn(styles.inputRange, className)}>
      <Slider
        className={styles.input}
        thumbClassName={styles.thumb}
        trackClassName={styles.track}
        defaultValue={defaultValue}
        value={[from, to]}
        min={min}
        max={max}
        onChange={handleChangeRange}
        minDistance={step}
        step={step}
      />
      <div className={styles.textContainer}>
        <Text size={TextSize.L} weight={TextWeight.MEDIUM}>
          {prevValueTextFrom} {from} {units}
        </Text>
        <Text size={TextSize.L} weight={TextWeight.MEDIUM}>
          {prevValueTextTo} {to} {units}
        </Text>
      </div>
    </div>
  )
}
