import cn from 'classnames';
import styles from './Calendar.module.scss'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru';
import CalendarIcon from '@images/calendar.svg'

interface DatePickerProps {
  className?: string;
}

export const Calendar = (props: DatePickerProps) => {
  const { className } = props;

  dayjs.extend(updateLocale);
  dayjs.updateLocale('ru', {
    months: [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ]
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <DatePicker
        format="DD.MM.YYYY"
        defaultValue={dayjs(new Date())}
        className={styles.calendar}
        showDaysOutsideCurrentMonth
        sx={{
          ".MuiOutlinedInput-root": {
            border: 'none'
          }
        }}
        slots={{
          openPickerIcon: CalendarIcon,
        }}
      />
    </LocalizationProvider>
  )
}
