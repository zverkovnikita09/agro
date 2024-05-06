import cn from 'classnames';
import styles from './SearchOnMap.module.scss'
import { Input } from '@shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Coord } from '@entities/Application';
import { FormEvent, useState } from 'react';

interface SearchOnMapProps {
  className?: string;
  loadPlaces?: string[]
  setPoints?: (point: Coord) => void
}

export const SearchOnMap = (props: SearchOnMapProps) => {
  const { className, loadPlaces = [], setPoints } = props;

  const [search, setSearch] = useState("")

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch("")
    setPoints?.({} as Coord)
  }

  return (
    <form className={cn(styles.searchOnMap, className)} onSubmit={handleFormSubmit}>
      <Input
        wrapperClassName={styles.inputWrapper}
        className={styles.input}
        placeholder='Введите пункт погрузки'
        autoComplete='off'
        withSearchIcon
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Button
        size={ButtonSize.S}
        theme={ButtonTheme.GREY}
        className={styles.submit}
        type='submit'
      >
        Найти
      </Button>
    </form>
  )
}
