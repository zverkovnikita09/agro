import cn from 'classnames';
import { ApplicationModel } from '@entities/Application';
import { useEffect, useState } from 'react';
import { Select } from '@shared/ui/Select';
import SearchIcon from '@images/search.svg'
import styles from './SearchOnMap.module.scss'

interface SearchOnMapProps {
  className?: string;
  applications?: ApplicationModel[]
  setPoints?: (point: [number, number]) => void
}

export const SearchOnMap = (props: SearchOnMapProps) => {
  const { className, applications = [], setPoints } = props;

  const [selectedPlace, setSelectedPlace] = useState("")

  useEffect(() => {
    if (selectedPlace) {
      const points = applications.find(item => item.load_place_name === selectedPlace)?.load_coordinates
      points && setPoints?.([Number(points.y), Number(points.x)])
    }
  }, [selectedPlace])

  const options = [...new Set(applications.map(item => item.load_place_name))]

  return (
    <div className={cn(styles.searchOnMap, className)}>
      <SearchIcon width={18} height={18} className={styles.searchIcon} />
      <Select
        placeholder='Введите пункт погрузки'
        withInputSearch
        className={styles.selectWrapper}
        togglerClassName={styles.select}
        options={options}
        value={selectedPlace}
        setValue={(value) => {
          setSelectedPlace(value as string)
        }}
        dropdownClassName={styles.dropdown}
        noArrow
        searchInputProps={{
          className: styles.input
        }}
        noOptionText='Совпадений не найдено'
        clearOnClose
      />
    </div>
  )
}
