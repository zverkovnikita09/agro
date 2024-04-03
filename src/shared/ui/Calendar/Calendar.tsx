import cn from 'classnames';
import styles from './Calendar.module.scss'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/ru';
import CalendarIcon from '@images/calendar.svg'
import { deDE } from '@mui/x-date-pickers/locales';

interface CalendarProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: dayjs.Dayjs | null) => void
}

const popperSx = {
  "& .MuiDateCalendar-root": {
    height: '375px',
    maxHeight: 'unset',
    width: '360px'
  },
  "& .MuiPickersCalendarHeader-label": {
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
    "& span": {
      display: 'none'
    }
  },
  "& .MuiDayCalendar-slideTransition": {
    minHeight: '280px',
  },
  "& .MuiDayCalendar-header": {
    gap: '10px',
  },
  "& .MuiDayCalendar-weekContainer": {
    margin: '10px 0',
    "&[aria-rowindex='1']": {
      marginTop: '1px'
    },
    gap: '10px'
  },
  "& .MuiPickersArrowSwitcher-button": {
    padding: '4px',
    borderRadius: '6px',
    outline: '1px solid var(--grey-text-color)'
  },
  "& .MuiPickersCalendarHeader-switchViewButton": {
    borderRadius: '6px',
    "& span": {
      display: 'none'
    }
  },
  "& .MuiPickersDay-root": {
    color: 'var(--text-color)',
    fontWeight: '500',
    fontSize: '16px',
    outline: '1px solid var(--special-grey-color2)',
    borderRadius: '6px',
    "& span": {
      display: 'none'
    },
    "&:focus": {
      backgroundColor: 'var(--special-grey-color2)',
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

    "&:hover": {
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

export const Calendar = (props: CalendarProps) => {
  const { className, placeholder = 'ДД.ММ.ГГГГ', value, onChange } = props;

  dayjs.extend(updateLocale);
  dayjs.updateLocale('ru', {
    months: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
      "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ],
  })

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs} localeText={
        {
          cancelButtonLabel: 'Отменить',
          okButtonLabel: 'Подтвердить',
          fieldYearPlaceholder: () => 'ГГГГ',
          fieldMonthPlaceholder: () => 'ММ',
          fieldDayPlaceholder: () => 'ДД'
        }
      }
      adapterLocale='ru'
    >
      <DatePicker
        format="DD.MM.YYYY"
        /* defaultValue={dayjs(new Date())} */
        className={cn(styles.calendar, className)}
        dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}`}
        /* value={dayjs(value)} */
        /*  onChange={(value) => onChange(value?.format("DD.MM.YYYY"))} */
        sx={{
          "& .MuiOutlinedInput-root": {
            border: 'none',
            outline: '1px solid var(--text-color)'
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: 'none'
          },
          "& .MuiInputBase-input": {
            padding: '15px 20px'
          },
          "& .MuiIconButton-root": {
            "&:hover": {
              backgroundColor: 'transparent',
            },
            "& span": {
              display: 'none',
            }
          },
        }}
        slots={{
          openPickerIcon: CalendarIcon,
        }}
        slotProps={{
          textField: { InputProps: { placeholder } },
          desktopPaper: { style: { marginTop: '8px', borderRadius: '12px' }, className: styles.popper },
          mobilePaper: { style: { margin: '0' } },
          popper: {
            sx: popperSx,
          },
          layout: {
            sx: popperSx
          },
          toolbar: { hidden: true },
          actionBar: {
            sx: {
              "& .MuiButton-root": {
                "&:hover": {
                  backgroundColor: 'var(--special-grey-color2)'
                },
                "& span": {
                  display: 'none'
                },
              },
              "& .MuiButton-text": {
                color: 'var(--accent-color)'
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}
