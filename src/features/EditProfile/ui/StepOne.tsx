import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import { EditProfileContext } from "./EditProfile";
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Select } from "@shared/ui/Select";
import { useSearchByDadata } from "@shared/hook/useSearchByDadata";

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

  const [searchFms, setSearchFms] = useState('');
  const [fmsOptions, setFmsOptions] = useState<any[]>([]);
  const [isFmsOptionsLoading, setIsFmsOptionsLoading] = useState(false);
  const minFmsQueryLength = 2;

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

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchFms,
    target: 'fms_unit',
    debounceTime: 700,
    minQueryLength: minFmsQueryLength,
    onSuccess: (data) => {
      setFmsOptions(data?.suggestions ?? []);
      setIsFmsOptionsLoading(false);
    },
  });

  const company = watch("name")
  const department = watch("department")

  useEffect(() => {
    if (company && companyOptions.length) {
      setValue("inn", companyOptions.find(item => item.value === company)?.data?.inn);
      setValue("ogrn", companyOptions.find(item => item.value === company)?.data?.ogrn ?? "");
      setValue("okved", companyOptions.find(item => item.value === company)?.data?.okved ?? "");
      setValue("type", companyOptions.find(item => item.value === company)?.data?.type === "LEGAL" ? "ООО" : "ИП");
      setValue("juridical_address", companyOptions.find(item => item.value === company)?.data?.address?.value ?? "")
    }
  }, [company])

  useEffect(() => {
    if (department && fmsOptions.length) {
      setValue("department_code", fmsOptions.find(item => item.value === department)?.data?.code);
    }
  }, [department])

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
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name }, formState: { errors } }) => (
              <Select
                label='Код подразделения'
                withInputSearch
                onSearchInput={(value) => {
                  if (value.length < minFmsQueryLength) {
                    setFmsOptions([]);
                    return;
                  }
                  setIsFmsOptionsLoading(true);
                  setSearchFms(value);
                }}
                hideOptions={isFmsOptionsLoading}
                options={fmsOptions.map(item => item?.value as string)}
                minLengthForOptions={minFmsQueryLength}
                value={value}
                /**
                 * Устанавливаем результат в поле кем выдан, так как опции являются названием подразделения
                 */
                setValue={(value) => {
                  setSearchFms("")
                  setValue("department", value as string)
                }}
                noArrow
                error={errors[name]?.message as string}
                searchInputProps={{ type: "number" }}
              />
            )}
          />
          {/* <Controller
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
          /> */}
        </div>
        <div className={styles.inputsThreeRow}>
          <Controller
            name="issue_date_at"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Поле обязательно к заполнению'
              },
              validate: (value) => {
                if (new Date(value) > new Date()) return 'Дата выдачи не может быть позже текущей даты'
                const date = value?.split(".");

                const [day, month, year] = date;

                if (Number(day) > 31) return 'Неверный формат даты';
                if (Number(month) < 1 || Number(month) > 12) return 'Неверный формат даты';
                if (Number(year) > new Date().getFullYear()) return 'Год выдачи не должен быть позже текущего года';
                if (Number(year) < 1971) return 'Год выдачи должен быть не ранее 1970'
                return true
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Дата выдачи'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
                mask="D9.M9.Y999"
                formatChars={{ 'D': '[0-3]', 'M': '[0-1]', 'Y': '[1-2]', '9': '[0-9]' }}
                type="tel"
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
                message: 'Некорректное значение поля снилс'
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
            confirmText: 'Вы действительно хотите очистить свой профиль?',
            additionalText: 'Внимание! В случае очистки кабинета данные удаляться безвозвратно',
            cancelButtonText: 'Вернуться',
            confirmButtonText: 'Очистить',
          }}
          onClick={onDeleteProfile}>
          Очистить данные профиля
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