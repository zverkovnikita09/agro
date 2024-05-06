import styles from './EditProfile.module.scss'
import { Control, useForm, UseFormResetField, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useDocumentEvent } from '@shared/hook/useDocumentEvent';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from '@src/app/router';
import { CardContainer } from '@shared/ui/CardContainer';
import { CloseButton } from '@shared/ui/CloseButton';
import { Title, TitleSize } from '@shared/ui/Title';
import { UserPhoto } from '@shared/ui/UserPhoto';
import { Text, TextColor, TextSize } from '@shared/ui/Text';
import { StepOne } from './StepOne';
import { fetchUserData, UserInfo, UserSelectors } from '@entities/User';
import { StepTwo } from './StepTwo';
import { useSendData } from '@shared/hook/useSendData';
import { useSelector } from 'react-redux';
import { addNotification, NotificationType } from '@entities/Notifications';
import { useAppDispatch } from '@src/app/store/model/hook';
import { useGetData } from '@shared/hook/useGetData';
import { FileToSendType, FileType } from '../model/editProfile.model';
import { LoadingBlock } from '@shared/ui/LoadingBlock';

interface EditProfileContextProps {
  watch: UseFormWatch<UserInfo>
  control: Control<UserInfo, any>
  setValue: UseFormSetValue<UserInfo>
  resetField: UseFormResetField<UserInfo>
  fileTypes?: FileType[]
  files: FileToSendType[]
  setFiles: (file: FileToSendType[]) => void
}

export const EditProfileContext = createContext<EditProfileContextProps>({} as EditProfileContextProps)

export const EditProfile = () => {
  const [formStep, setFormStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  /*   const { state } = useLocation(); */

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const userInfo = useSelector(UserSelectors.selectUserData)

  const { handleSubmit, watch, control, setValue, resetField } = useForm<UserInfo>({
    mode: "onBlur",
    defaultValues: {
      department: userInfo?.userinfo?.department ?? "",
      department_code: userInfo?.userinfo?.department_code ?? "",
      inn: userInfo?.userinfo?.inn ?? undefined,
      issue_date_at: userInfo?.userinfo?.issue_date_at ?? "",
      juridical_address: userInfo?.userinfo?.juridical_address ?? "",
      name: userInfo?.userinfo?.name ?? "",
      number: userInfo?.userinfo?.number,
      office_address: userInfo?.userinfo?.office_address ?? "",
      ogrn: userInfo?.userinfo?.ogrn,
      okved: userInfo?.userinfo?.okved ?? "",
      series: userInfo?.userinfo?.series,
      snils: userInfo?.userinfo?.snils ?? "",
      tax_system: userInfo?.userinfo?.tax_system ?? "",
      type: userInfo?.userinfo?.type
    }
  });

  const [files, setFiles] = useState<FileToSendType[]>([])

  const [avatar, setAvatar] = useState<File>();

  const initialAvatar = userInfo?.files?.find((file) => file.fileType.title === 'Аватар')?.path_url ?? '';

  const dispatch = useAppDispatch()

  const { handleSendData: changeAvatar } = useSendData(
    {
      url: `/api/v1/userprofile/avatar/${initialAvatar ? 'update' : 'create'}`,
      withAuthToken: true,
    }
  )

  const { handleSendData: sendFiles } = useSendData({
    url: "/api/v1/files/load_files",
    withAuthToken: true
  })

  const handleSendFiles = async (files: FileToSendType[]) => {
    const file_types = files.map(item => item.file_types)
    const load_files = files.map(item => item.load_files)

    await sendFiles({ file_types, load_files })
  }

  const { handleSendData, isSending } = useSendData(
    {
      url: "/api/v1/userprofile/update",
      withAuthToken: true,
      method: "PUT",
      type: "x-www-form-urlencoded",
      onSuccess: async () => {
        if (avatar) await changeAvatar({ avatar })
        if (files.length) await handleSendFiles(files)

        dispatch(addNotification({ message: 'Данные профиля успешно изменены', type: NotificationType.Success }));
        navigate(RouterPaths.LK)
        dispatch(fetchUserData())
      }
    }
  )

  const { handleSendData: deleteProfile } = useSendData(
    {
      url: "/api/v1/userprofile/delete",
      withAuthToken: true,
      method: "PUT",
      onSuccess: () => {
        dispatch(addNotification({ message: 'Данные профиля успешно удалены', type: NotificationType.Success }));
        navigate(RouterPaths.LK)
        dispatch(fetchUserData())
      }
    }
  )

  const { data: fileTypes, isSuccess: isFileTypeSuccess } = useGetData<FileType[]>({
    url: "/api/v1/files/file_types",
    withAuthToken: true,
    dataFlag: true
  })

  const closeForm = () => {
    navigate(RouterPaths.LK)
  }

  const onDeleteProfile = () => {
    deleteProfile({})
  }

  const FormContent = () => {
    switch (formStep) {
      case 1: return <StepOne onCancel={closeForm} onDeleteProfile={onDeleteProfile} />
      case 2: return <StepTwo onPrev={() => setFormStep(1)} isLoading={isSending} onDeleteProfile={onDeleteProfile} />
      default: return null
    }
  }

  const onFormSend = (data: UserInfo) => {
    handleSendData(data)
  }

  const onSubmit = () => {
    switch (formStep) {
      case 1: return () => setFormStep(2);
      default: return onFormSend
    }
  }

  useLayoutEffect(() => {
    openOverlay()

    return () => closeOverlay()
  }, [])

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeForm()
  };

  useDocumentEvent('keydown', closeOnEsc);

  return (
    <div className={styles.editProfile}>
      <CardContainer className={styles.container}>
        {
          !isFileTypeSuccess && <div className={styles.loading}><LoadingBlock /></div>
        }
        <CloseButton onClick={closeForm} className={styles.closeBtn} />
        <div className={styles.heading}>
          <UserPhoto
            editable
            image={avatar || initialAvatar}
            setImage={setAvatar}
            setError={(message) => dispatch(addNotification({ message, type: NotificationType.Error }))}
          />
          <div className={styles.headingInfo}>
            <Title size={TitleSize.S}>Личный кабинет</Title>
            <Text color={TextColor.GREY} size={TextSize.XL}>Заполните свои личные данные</Text>
          </div>
        </div>
        <EditProfileContext.Provider value={{ watch, control, setValue, resetField, fileTypes, files, setFiles }}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit(onSubmit())}>
            {FormContent()}
          </form>
        </EditProfileContext.Provider>
      </CardContainer>
    </div>
  )
}
