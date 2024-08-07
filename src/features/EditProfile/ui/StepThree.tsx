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

interface StepThreeProps {
  onPrev: () => void
  isLoading?: boolean
  onDeleteProfile: () => void
}

export const StepThree = ({ onPrev, isLoading, onDeleteProfile }: StepThreeProps) => {
  const {
    control,
    setFiles,
    files,
    setFilesToDelete,
    filesToDelete,
    watch,
    setValue
  } = useContext(EditProfileContext);

  const dispatch = useDispatch();

  const user = useSelector(UserSelectors.selectUserData);

  const handleFileChange = (title: string) => (file: File) => {
    const fileObj: FileToSendType = { file_type: title, file: file };
    const findFileId = files.find(item => item.file_type === title)?.file_id;

    if (findFileId) fileObj.file_id = findFileId;

    if (filesToDelete.find(file => file.file_type === title)) {
      setFilesToDelete(prev => prev.filter(item => item.file_type !== title))
    }

    setFiles((prev) => [...prev.filter(({ file_type }) => file_type !== title), fileObj])
  }

  const handleFileDelete = (title: string) => () => {
    setFiles((prev) => [...prev.filter(({ file_type }) => file_type !== title)])
    const fileToDelete = user?.files?.find(file => file.type === title);
    if (fileToDelete) {
      setFilesToDelete(prev => [...prev, { file_type: fileToDelete.type, file_id: fileToDelete.id }])
    }
  }

  return (
    <>
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
            setFile={handleFileChange('Реквизиты')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("Реквизиты")}
                hasImage={!!(files.find(item => item.file_type === 'Реквизиты'))}
              >
                Реквизиты
              </UploadImageButton>}
          </FileInputPopup>
          <FileInputPopup
            title={'ПСФЛ'}
            setFile={handleFileChange('ПСФЛ')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("ПСФЛ")}
                hasImage={!!(files.find(item => item.file_type === 'ПСФЛ'))}
              >
                ПСФЛ
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'ЕФС'}
            setFile={handleFileChange('ЕФС')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("ЕФС")}
                hasImage={!!(files.find(item => item.file_type === 'ЕФС'))}
              >
                ЕФС
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'Налоговая тайна'}
            setFile={handleFileChange('Налоговая тайна')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("Налоговая тайна")}
                hasImage={!!(files.find(item => item.file_type === 'Налоговая тайна'))}
              >
                Налоговая тайна
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'Патент'}
            setFile={handleFileChange('Патент')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("Патент")}
                hasImage={!!(files.find(item => item.file_type === 'Патент'))}
              >
                Патент
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'УСН'}
            setFile={handleFileChange('УСН')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("УСН")}
                hasImage={!!(files.find(item => item.file_type === 'УСН'))}
              >
                УСН
              </UploadImageButton>
            }
          </FileInputPopup>
          <FileInputPopup
            title={'НДС'}
            setFile={handleFileChange('НДС')}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          >
            {(openPopup) =>
              <UploadImageButton
                handleOpenPopup={openPopup}
                handleDeleteImage={handleFileDelete("НДС")}
                hasImage={!!(files.find(item => item.file_type === 'НДС'))}
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