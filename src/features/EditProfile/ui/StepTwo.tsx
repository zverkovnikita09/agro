import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import { EditProfileContext } from "./EditProfile";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { FileInputPopup } from "@shared/ui/FileInputPopup";
import { UploadImageButton } from "@shared/ui/UploadImageButton";
import { FileToSendType } from "../model/editProfile.model";
import { useDispatch, useSelector } from "react-redux";
import { NotificationType, addNotification } from "@entities/Notifications";
import { UserSelectors } from "@entities/User";
import { Checkbox } from "@shared/ui/Checkbox";
import { useToggleValue } from "@shared/hook/useToggleValue";
import { Select } from "@shared/ui/Select";
import { useSearchByDadata } from "@shared/hook/useSearchByDadata";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useGetData } from "@shared/hook/useGetData";
import { Input } from "@shared/ui/Input";

interface StepTwoProps {
  onPrev: () => void
  isLoading?: boolean
  onDeleteProfile: () => void
}

export const StepTwo = ({ onPrev, isLoading, onDeleteProfile }: StepTwoProps) => {
  const {
    control,
    watch,
    setValue
  } = useContext(EditProfileContext);

  const [searchFms, setSearchFms] = useState('');
  const [fmsOptions, setFmsOptions] = useState<any[]>([]);
  const [isFmsOptionsLoading, setIsFmsOptionsLoading] = useState(false);
  const minFmsQueryLength = 2;

  const department = watch("department")

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

  useEffect(() => {
    if (department && fmsOptions.length) {
      setValue("department_code", fmsOptions.find(item => item.value === department)?.data?.code);
    }
  }, [department]);

  const companyType = watch("type");
  const isOOO = companyType === "ООО";

  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Личные данные {isOOO ? "директора" : ""}
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
                mask="99999999999"
                type="tel"
              />
            )}
          />
        </div>
        <div className={styles.inputsThreeRow}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Имя'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="surname"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Фамилия'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="patronymic"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Отчество'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="bdate"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Поле обязательно к заполнению'
              },
              validate: (value) => {
                if (new Date(value) > new Date()) return 'Дата рождения не может быть позже текущей даты'
                const date = value?.split(".");

                const [day, month, year] = date;

                if (Number(day) > 31) return 'Неверный формат даты';
                if (Number(month) < 1 || Number(month) > 12) return 'Неверный формат даты';
                if (Number(year) > new Date().getFullYear()) return 'Дата рождения не должна быть позже текущего года';
                return true
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Дата рождения'
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
            name="gender"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={[{ name: 'Мужской', value: 'M' }, { name: 'Женский', value: 'F' }]}
                setValue={onChange}
                value={value}
                label='Пол'
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Значение поля не является правильным email адресом.'
              }
            }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Email'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>
        {isOOO && <div className={styles.inputsThreeRow}>
          <Controller
            name="inn"
            control={control}
            rules={{
              required: "Поле обязательно к заполнению",
              pattern: {
                value: /^[^_]*$/,
                message: 'Некорректный ИНН.'
              }
            }}
            render={({ formState: { errors }, field: { value, onChange, name } }) => (
              <Input
                label='ИНН'
                mask="9999999999"
                type='tel'
                value={value}
                onChange={onChange}
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>}
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.additionalButton}
          onClick={onDeleteProfile}
          withConfirm
          alertPopupProps={{
            confirmText: 'Вы действительно хотите очистить свой профиль?',
            additionalText: 'Внимание! В случае очистки кабинета данные удаляться безвозвратно',
            cancelButtonText: 'Вернуться',
            confirmButtonText: 'Очистить',
          }}
        >
          Очистить данные профиля
        </Button>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={onPrev}
        >
          Назад
        </Button>
        <Button
          theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
          size={ButtonSize.S}
          className={styles.button}
          type='submit'
          isLoading={isLoading}
        >
          Далее
        </Button>
      </div>
    </>
  )
}