import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext } from "react";
import { EditProfileContext } from "./EditProfile";
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Calendar } from "@shared/ui/Calendar";
import { Select } from "@shared/ui/Select";
import {FileInputPopup} from "@shared/ui/FileInputPopup";
import {UploadImageButton} from "@shared/ui/UploadImageButton";

interface StepTwoProps {
  onPrev: () => void
  isLoading?: boolean
  onDeleteProfile: () => void
}

export const StepTwo = ({ onPrev, isLoading, onDeleteProfile }: StepTwoProps) => {
  const { control, watch, setValue } = useContext(EditProfileContext);
  return (
    <>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Введите ИНН
        </Text>
        <Controller
          name="juridical_address"
          control={control}
          render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
            <Input
              label='Юридический адрес'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors[name]?.message as string}
            />
          )}
        />
        <Controller
          name="office_address"
          control={control}
          render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
            <Input
              label='Фактический адрес'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors[name]?.message as string}
            />
          )}
        />
        <Controller
          name="tax_system"
          control={control}
          render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
            <Input
              label='Система налогооблажения'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors[name]?.message as string}
            />
          )}
        />
      </div>
      <FileInputPopup title={'Реквизиты'}>
        {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => {}}>
          Реквизиты
        </UploadImageButton>}
      </FileInputPopup>
      {/* <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Документы
        </Text> */}
      {/* <div className={styles.inputsThreeRow}>
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
            render={(props) => (
              <Calendar
                placeholder='Дата начала перевозки'
                value={props.field.value}
                onChange={props.field.onChange}
                error={props.fieldState.error?.message}
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
        </div> */}
      {/* </div> */}
      <div className={styles.buttonsContainer}>
        <Button className={styles.additionalButton} onClick={onDeleteProfile}>
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
          Сохранить
        </Button>
      </div>
    </>
  )
}