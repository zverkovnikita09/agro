import { Text, TextSize, TextWeight } from "@shared/ui/Text"
import styles from './EditProfile.module.scss'
import { Controller } from "react-hook-form"
import { useContext } from "react";
import { EditProfileContext } from "./EditProfile";
import { Input } from "@shared/ui/Input";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { FileInputPopup } from "@shared/ui/FileInputPopup";
import { UploadImageButton } from "@shared/ui/UploadImageButton";
import { FileToSendType } from "../model/editProfile.model";
import { useDispatch, useSelector } from "react-redux";
import { NotificationType, addNotification } from "@entities/Notifications";
import { UserSelectors } from "@entities/User";

interface StepTwoProps {
  onPrev: () => void
  isLoading?: boolean
  onDeleteProfile: () => void
}

export const StepTwo = ({ onPrev, isLoading, onDeleteProfile }: StepTwoProps) => {
  const { control, fileTypes, setFiles, files, setFilesToDelete, filesToDelete } = useContext(EditProfileContext);

  const dispatch = useDispatch();

  const user = useSelector(UserSelectors.selectUserData);

  const handleFileChange = (id: string, title: string) => (file: File) => {
    const fileObj: FileToSendType = { file_types: id, title, load_files: file };

    if (filesToDelete.find(file => file.title === title)) {
      setFilesToDelete(prev => prev.filter(item => item.title !== title))
    }

    setFiles((prev) => [...prev.filter(({ file_types }) => file_types !== id), fileObj])
  }

  const handeleFileDelete = (name: string) => () => {
    setFiles((prev) => [...prev.filter(({ title }) => title !== name)])
    const fileToDelete = user?.files?.find(file => file.fileType.title === name);
    if (fileToDelete) {
      setFilesToDelete(prev => [...prev, { file_types: fileToDelete.fileType.id, title: name }])
    }
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
          <FileInputPopup
            title={'Реквизиты'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'Реквизиты')?.id ?? "", 'Реквизиты')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("Реквизиты")}
                hasImage={!!(files.find(item => item.title === 'Реквизиты'))}
              >
                Реквизиты
              </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup
            title={'ПСФЛ'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'ПСФЛ')?.id ?? "", 'ПСФЛ')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("ПСФЛ")}
                hasImage={!!(files.find(item => item.title === 'ПСФЛ'))}
              >
                ПСФЛ
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'ЕФС'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'ЕФС')?.id ?? "", 'ЕФС')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("ЕФС")}
                hasImage={!!(files.find(item => item.title === 'ЕФС'))}
              >
                ЕФС
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'Налоговая тайна'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'Налоговая тайна')?.id ?? "", 'Налоговая тайна')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("Налоговая тайна")}
                hasImage={!!(files.find(item => item.title === 'Налоговая тайна'))}
              >
                Налоговая тайна
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'Патент'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'Патент')?.id ?? "", 'Патент')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("Патент")}
                hasImage={!!(files.find(item => item.title === 'Патент'))}
              >
                Патент
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'УСН'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'УСН')?.id ?? "", 'УСН')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("УСН")}
                hasImage={!!(files.find(item => item.title === 'УСН'))}
              >
                УСН
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'НДС'}
            setFile={handleFileChange(fileTypes?.find(item => item.title === 'НДС')?.id ?? "", 'НДС')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handeleFileDelete("НДС")}
                hasImage={!!(files.find(item => item.title === 'НДС'))}
              >
                НДС
              </UploadImageButton>
            }
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
          Сохранить
        </Button>
      </div>
    </>
  )
}