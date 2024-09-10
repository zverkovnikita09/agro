import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import { EditProfileContext } from "./EditProfile";
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Select } from "@shared/ui/Select";
import { useSearchByDadata } from "@shared/hook/useSearchByDadata";
import { Checkbox } from "@shared/ui/Checkbox";
import { useGetData } from "@shared/hook/useGetData";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useToggleValue } from "@shared/hook/useToggleValue";

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

  const company = watch("short_name");

  useEffect(() => {
    if (company && companyOptions.length) {
      const targetCompany: any = companyOptions.find(item => item.value === company);
      const companyType = targetCompany?.data?.type === "LEGAL" ? "ООО" : "ИП";
      const companyRegion = targetCompany?.data?.address?.data?.region_type_full.toLowerCase() === 'город'
        ? targetCompany?.data?.address?.data?.region
        : targetCompany?.data?.address?.data?.region + " " + targetCompany?.data?.address?.data?.region_type_full.charAt(0).toUpperCase() +
        targetCompany?.data?.address?.data?.region_type_full.slice(1).toLowerCase();

      setValue("inn", targetCompany?.data?.inn);
      setValue("cinn", targetCompany?.data?.inn);
      setValue("ogrn", targetCompany?.data?.ogrn ?? "");
      setValue("okved", targetCompany?.data?.okved ?? "");
      setValue("type", companyType);
      setValue("juridical_address", targetCompany?.data?.address?.value ?? "");
      setValue("full_name", targetCompany?.data?.name?.full_with_opf ?? "");
      setValue("region", companyRegion);
      setValue("cregion", companyRegion.split(" ")[0]);

      if (companyType === "ИП") {
        setValue("name", targetCompany?.data?.fio?.name ?? "");
        setValue("patronymic", targetCompany?.data?.fio?.patronymic ?? "");
        setValue("surname", targetCompany?.data?.fio?.surname ?? "");
      }
      if (companyType === "ООО") {
        const [surname, name, patronymic] = targetCompany.data?.management?.name?.split(' ') ?? [];

        setValue("name", name ?? "");
        setValue("patronymic", patronymic ?? "");
        setValue("surname", surname ?? "");
        setValue("ckpp", targetCompany?.data?.kpp ?? "")
      }
    }
  }, [company])

  const [searchPlace, setSearchPlace] = useState('');
  const [placeOptions, setPlaceOptions] = useState<any[]>([]);
  const [isPlaceOptionsLoading, setIsPlaceOptionsLoading] = useState(false);
  const minPlaceQueryLength = 3;

  const [addressCheckbox, toggleAddressCheckbox] = useToggleValue(true)

  useSearchByDadata<{ suggestions: any[] }>({
    query: searchPlace,
    target: 'address',
    debounceTime: 700,
    minQueryLength: minPlaceQueryLength,
    onSuccess: (data) => {
      setPlaceOptions(data?.suggestions ?? []);
      setIsPlaceOptionsLoading(false);
    },
  });

  const juridical_address = watch("juridical_address");

  useEffect(() => {
    if (addressCheckbox) {
      setValue("office_address", juridical_address)
    }
  }, [addressCheckbox, juridical_address])

  const { data: options, isSuccess: isOptionsSuccess } = useGetData<string[]>(
    {
      url: '/api/v1/userprofile/tax-systems',
      dataFlag: true,
      withAuthToken: true,
    })

  return (
    <>
      {!isOptionsSuccess && (
        <div className={styles.loading}>
          <LoadingBlock />
        </div>
      )}
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Информация о компании
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
                  setValue("short_name", value as string)
                }}
                noArrow
                error={errors[name]?.message as string}
                searchInputProps={{ type: "number" }}
              />
            )}
          />
          <Controller
            name="short_name"
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
        <div className={styles.inputsRow}>
          <Controller
            name="tax_system"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={options ?? []}
                setValue={onChange}
                value={value}
                label='Система налогооблажения'
                withInputSearch
              />
            )}
          />
          <Controller
            name="accountant_phone"
            control={control}
            rules={{
              required: false,
              pattern: {
                value: /^[^_]*$/,
                message: 'Некорректный номер телефона.'
              }
            }}
            render={({ formState: { errors }, field: { value, onChange, name } }) => (
              <Input
                label='Номер телефона бухгалтера'
                mask="+79999999999"
                type='tel'
                value={value}
                onChange={onChange}
                error={errors[name]?.message as string}
              />
            )}
          />
        </div>
        <div className={styles.inputBlock}>
          <Controller
            name="juridical_address"
            control={control}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Юридический адрес'
                withInputSearch
                onSearchInput={(value) => {
                  if (value.length < minPlaceQueryLength) {
                    setPlaceOptions([]);
                    return;
                  }
                  setIsPlaceOptionsLoading(true);
                  setSearchPlace(value);
                }}
                hideOptions={isPlaceOptionsLoading}
                options={placeOptions.map(item => item.value as string)}
                minLengthForOptions={minPlaceQueryLength}
                value={value}
                setValue={(value) => {
                  setSearchPlace("")
                  onChange(value)
                }}
                noArrow
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="office_address"
            control={control}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                label='Фактический адрес'
                withInputSearch
                onSearchInput={(value) => {
                  if (value.length < minPlaceQueryLength) {
                    setPlaceOptions([]);
                    return;
                  }
                  setIsPlaceOptionsLoading(true);
                  setSearchPlace(value);
                }}
                hideOptions={isPlaceOptionsLoading}
                options={placeOptions.map(item => item.value as string)}
                minLengthForOptions={minPlaceQueryLength}
                value={value}
                setValue={(value) => {
                  setSearchPlace("")
                  onChange(value)
                }}
                noArrow
                disabled={addressCheckbox}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Checkbox
            checked={addressCheckbox}
            name="addressToggler"
            setChecked={toggleAddressCheckbox}
          >
            Фактический адрес совпадает с юридическим
          </Checkbox>
        </div>
      </div >
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