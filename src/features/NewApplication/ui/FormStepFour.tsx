import { useContext, useMemo } from 'react'
import styles from './NewApplication.module.scss'
import { NewApplicationContext } from './NewApplication'
import { Text, TextSize, TextWeight } from '@shared/ui/Text'
import { Controller } from 'react-hook-form'
import { Input } from '@shared/ui/Input'
import { TextArea } from '@shared/ui/TextArea'
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button'
import BurgerIcon from '@images/two-lines-burger.svg'
import { useGetData } from '@shared/hook/useGetData'
import { IManager } from '@entities/Manager'
import { LoadingBlock } from '@shared/ui/LoadingBlock'
import { Select } from '@shared/ui/Select'

interface FormStepFourProps {
  prevStep: () => void
  toAdditional: () => void
  isLoading?: boolean
}

export const FormStepFour = ({ isLoading, prevStep, toAdditional }: FormStepFourProps) => {
  const { control, watch } = useContext(NewApplicationContext)
  const { data: managers, isSuccess: isManagersSuccess } = useGetData<IManager[]>({ url: "/api/v1/managers" });

  const managersOptions = managers?.map(({ id, name }) => ({ name, value: id })) ?? [];
  const selectedManager = watch("manager_id");

  const managerPhone = useMemo(() => {
    if (!managers?.length || !selectedManager) return "";

    return managers.find(({ id }) => selectedManager === id)?.phone ?? "";
  }, [selectedManager])

  return (
    <>
   {/*    {!isManagersSuccess && (
        <div className={styles.loading}>
          <LoadingBlock />
        </div>
      )} */}
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Информация
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="contact_name"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange, onBlur }, formState: { errors } }) => (
              <Input
                label='Контактное лицо'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
              />
            )}
          />
          <Controller
            name="contact_phone"
            control={control}
            rules={{
              required: 'Необходимо заполнить номер телефона.', pattern: {
                value: /^[^_]*$/,
                message: 'Необходимо заполнить номер телефона.'
              }
            }}
            render={({ formState: { errors }, field: { value, name, onChange, onBlur } }) => (
              <Input
                label='Номер телефона'
                mask="+79999999999"
                type='tel'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors[name]?.message as string}
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
          Менеджер
        </Text>
        <div className={styles.inputsRow}>
          <Controller
            name="manager_id"
            control={control}
            rules={{ required: "Поле обязательно к заполнению" }}
            render={({ field: { value, name, onChange }, formState: { errors } }) => (
              <Select
                options={managersOptions}
                setValue={onChange}
                value={value}
                error={errors[name]?.message as string}
                label='Выберите менеджера'
                withInputSearch
              />
            )}
          />
          <Input
            label='Номер телефона'
            value={managerPhone}
            disabled
          />
        </div>
      </div>
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Примечание
        </Text>
        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextArea
              placeholder='Укажите доп. информацию'
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button className={styles.additionalButton} onClick={toAdditional}>
          <BurgerIcon />
          Дополнительные параметры заявки
        </Button>
        <Button
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.S}
          className={styles.button}
          onClick={prevStep}
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
          Создать заявку
        </Button>
      </div>
    </>
  )
}