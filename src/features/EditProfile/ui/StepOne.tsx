import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import { EditProfileContext } from "./EditProfile";
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Calendar } from "@shared/ui/Calendar";
import { Select } from "@shared/ui/Select";
import { useSearchByDadata } from "@shared/hook/useSearchByDadata";
import dayjs from "dayjs";

interface StepOneProps {
  onCancel: () => void
  onDeleteProfile: () => void
}

export const StepOne = ({ onCancel, onDeleteProfile }: StepOneProps) => {
  const { control, watch, setValue } = useContext(EditProfileContext);

  const [searchCompany, setSearchCompany] = useState('');
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
  const [isCompanyOptionsLoading, setIsCompanyOptionsLoading] = useState(false);

  const minCompanyQueryLength = 2;

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchCompany,
    target: 'party',
    debounceTime: 700,
    minQueryLength: minCompanyQueryLength,
    onSuccess: (data) => {
      setCompanyOptions(data?.suggestions ?? []);
      setIsCompanyOptionsLoading(false);
    },
  });

  const company = watch("name")

  useEffect(() => {
    if (company && companyOptions.length) {
      setValue("inn", companyOptions.find(item => item.value === company)?.data?.inn);
      setValue("ogrn", companyOptions.find(item => item.value === company)?.data?.ogrn);
      setValue("okved", companyOptions.find(item => item.value === company)?.data?.okved);
      setValue("type", companyOptions.find(item => item.value === company)?.data?.type === "LEGAL" ? "ООО" : "ИП");
    }
  }, [company])

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Введите ИНН
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="inn"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name }, formState: { errors } }) => (
              <Select
                label='ИНН'
                withInputSearch
                onSearchInput={(value) => {
                  if (value.length < minCompanyQueryLength) {
                    setCompanyOptions([]);
                    return;
                  }
                  setIsCompanyOptionsLoading(true);
                  setSearchCompany(value);
                }}
                hideOptions={isCompanyOptionsLoading}
                options={companyOptions.map(item => item?.value as string)}
                minLengthForOptions={minCompanyQueryLength}
                value={value}
                /**
                 * Устанавливаем результат в поле название компании, так как опции являются названием
                 */
                setValue={(value) => {
                  console.log(value);
                  setSearchCompany("")
                  setValue("name", value as string)
                }}
                noArrow
                error={errors[name]?.message as string}
                searchInputProps={{ type: "number" }}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Название организации'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                disabled
              />
            )}
          />
        </div>
        <div className={styles.inputsRow}>
          <Controller
            name="ogrn"
            control={control}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='ОГРН'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                disabled
              />
            )}
          />
          <Controller
            name="okved"
            control={control}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Основной ОКВЭД'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                disabled
              />
            )}
          />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Личные данные
        </Text>
        <div className={styles.inputsThreeRow}>
          <Controller
            name="series"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Поле обязательно к заполнению'
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Серия паспорта'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                mask="9999"
                type="tel"
              />
            )}
          />
          <Controller
            name="number"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Поле обязательно к заполнению'
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Номер паспорта'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                mask="999999"
                type="tel"
              />
            )}
          />
          <Controller
            name="department_code"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Поле обязательно к заполнению'
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Код подразделения'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                mask="999-999"
                type="tel"
              />
            )}
          />
        </div>
        <div className={styles.inputsThreeRow}>
          <Controller
            name="issue_date_at"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению"
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Calendar
                placeholder='Дата выдачи'
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            name="department"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Кем выдан'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="snils"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Поле обязательно к заполнению'
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='СНИЛС'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                mask="999-999-999 99"
                type="tel"
              />
            )}
          />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.additionalButton}
          withConfirm
          alertPopupProps={{
            confirmText: 'Вы действительнохотите удалить свой профиль?',
            additionalText: 'Внимание! В случае удаления кабинета данные удаляться безвозвратно',
            cancelButtonText: 'Вернуться',
            confirmButtonText: 'Удалить',
          }}
          onClick={onDeleteProfile}>
          Удалить профиль
        </Button>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
          className={styles.button}
          type='submit'
        >
          Далее
        </Button>
      </div>
    </>
  )
}