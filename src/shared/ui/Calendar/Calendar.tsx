import cn from 'classnames';
import styles from './Calendar.module.scss'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru';
import CalendarIcon from '@images/calendar.svg'

interface DatePickerProps {
  className?: string;
}

const popperSx = {
  "& .MuiDateCalendar-root":{
    height: '350px',
    maxHeight: 'unset',
    width: '330px'
  },
  "& .MuiPickersCalendarHeader-label":{
    fontSize: '18px',
    fontWeight: '600'
  },
  "& .MuiTypography-root": {
    fontSize: '16px',
    color: 'var(--text-color)',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  "& .MuiPickersArrowSwitcher-root": {
    gap: '8px',
    "& span":{
      display: 'none'
    }
  },
  "& .MuiDayCalendar-slideTransition": {
    minHeight: '250px',
  },
  "& .MuiDayCalendar-header": {
    gap: '5px',
  },
  "& .MuiDayCalendar-weekContainer": {
    "&:not(:first-child)":{
      margin: '4px 0',
    },
    gap: '5px'
  },
  "& .MuiPickersArrowSwitcher-button": {
    padding: '4px',
    borderRadius: '6px',
    outline: '1px solid var(--grey-text-color)'
  },
  "& .MuiPickersCalendarHeader-switchViewButton": {
    borderRadius: '6px',
    "& span":{
      display: 'none'
    }
  },
  "& .MuiPickersDay-root": {
    color: 'var(--text-color)',
    fontWeight: '500',
    fontSize: '16px',
    outline: '1px solid var(--special-grey-color2)',
    borderRadius: '6px',
    "& span":{
      display: 'none'
    },
    "&:focus": {
      backgroundColor: 'var(--disabled-color)',
    },
    "&:focus.Mui-selected": {
      backgroundColor: 'var(--accent-hover-color)',
    },
    "&:hover": {
      backgroundColor: 'var(--special-grey-color2)',
    },
  },
  "& .MuiPickersDay-root.Mui-selected": {
    borderRadius: '6px',
    backgroundColor: 'var(--primary-yellow)',

    "&:hover":{
      backgroundColor: 'var(--accent-hover-color)'
    }
  },
  "& .MuiPickersDay-today": {
    backgroundColor: 'transparent',
    color: 'var(--primary-yellow)',
    outline: '1px solid var(--primary-yellow)'
  },
  "& .MuiPickersDay-today.Mui-selected": {
    color: 'var(--white-color)',
    outline: 'var(--primary-yellow)'
  },
  "& .MuiPickersDay-today:not(Mui-selected)": {
    border: 'none',
  },
  "& .MuiPickersYear-yearButton": {
    "&:focus": {
      backgroundColor: '#CCC',
    },
    "&:focus.Mui-selected": {
      backgroundColor: '#ECAE2A',
    },
    "&:hover": {
      backgroundColor: '#ECAE2A',
    },
  },
  "& .MuiPickersYear-yearButton.Mui-selected": {
    backgroundColor: '#F2B430',
  },
}

export const Calendar = (props: DatePickerProps) => {
  const {className} = props;

  dayjs.extend(updateLocale);
  dayjs.updateLocale('ru', {
    months: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
      "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ],
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{cancelButtonLabel: 'Отменить', okButtonLabel: 'Подтвердить'}} adapterLocale='ru'>
      <DatePicker
        format="DD.MM.YYYY"
        defaultValue={dayjs(new Date())}
        className={styles.calendar}
        dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}`}
        sx={{
          "& .MuiOutlinedInput-root": {
            border: 'none',
            outline: '1px solid var(--text-color)'
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: 'none'
          },
          "& .MuiIconButton-root": {
            "&:hover": {
              backgroundColor: 'transparent',
            },
            "& span":{
              display: 'none',
            }
          },
        }}
        slots={{
          openPickerIcon: CalendarIcon,
        }}
        slotProps={{
          desktopPaper: { style: {marginTop: '8px', borderRadius: '12px'} },
          mobilePaper: {style: {margin: '0'}},
          popper: {
            sx: popperSx,
          },
          layout: {
            sx: popperSx
          },
          toolbar: {hidden: true},
          actionBar: {
            sx:{
              "& .MuiButton-root":{
                "&:hover": {
                  backgroundColor: 'var(--special-grey-color2)'
                },
                "& span": {
                  display: 'none'
                },
              },
              "& .MuiButton-text":{
                color: 'var(--accent-color)'
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}
