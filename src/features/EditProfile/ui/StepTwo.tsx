import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext } from "react";
import { EditProfileContext } from "./EditProfile";
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { FileInputPopup } from "@shared/ui/FileInputPopup";
import { UploadImageButton } from "@shared/ui/UploadImageButton";

interface StepTwoProps {
  onPrev: () => void
  isLoading?: boolean
  onDeleteProfile: () => void
}

export const StepTwo = ({ onPrev, isLoading, onDeleteProfile }: StepTwoProps) => {
  const { control, fileTypes, setFiles, files } = useContext(EditProfileContext);

  const handleFileChange = (id: string) => (file: File) => {

    setFiles([])
  }

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
      <div className={styles.inputBlock}>
        <Text
          weight={TextWeight.BOLD}
          size={TextSize.XL}
        >
          Документы
        </Text>
        <div className={styles.inputsRowWithGap}>
          {/*  <FileInputPopup title={'Реквизиты'} setFile={handleFileChange()}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              Реквизиты
            </UploadImageButton>}
          </FileInputPopup> */}
          <FileInputPopup title={'ПСФЛ'} setFile={handleFileChange(fileTypes?.find(item => item.title === 'ПСФЛ')?.id ?? "")}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              ПСФЛ
            </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup title={'ЕФС'} setFile={handleFileChange(fileTypes?.find(item => item.title === 'ЕФС')?.id ?? "")}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              ЕФС
            </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup title={'Налоговая тайна'} setFile={handleFileChange(fileTypes?.find(item => item.title === 'Налоговая тайна')?.id ?? "")}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              Налоговая тайна
            </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup title={'Патент'} setFile={handleFileChange(fileTypes?.find(item => item.title === 'Патент')?.id ?? "")}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              Патент
            </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup title={'УСН'} setFile={handleFileChange(fileTypes?.find(item => item.title === 'УСН')?.id ?? "")}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              УСН
            </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup title={'НДС'} setFile={handleFileChange(fileTypes?.find(item => item.title === 'НДС')?.id ?? "")}>
            {(openPopup) => <UploadImageButton handleOpenPopup={openPopup} handleDeleteImage={() => { }}>
              НДС
            </UploadImageButton>}
          </FileInputPopup>
        </div>
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
            confirmButtonText: 'Удалить',
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
          Сохранить
        </Button>
      </div>
    </>
  )
}