import styles from './EditProfile.module.scss'
import { Control, useForm, UseFormResetField, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { createContext, Dispatch, SetStateAction, useContext, useLayoutEffect, useRef, useState } from 'react';
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
import { FileToSendType, } from '../model/editProfile.model';
import { StepThree } from "@features/EditProfile/ui/StepThree";

interface EditProfileContextProps {
  watch: UseFormWatch<UserInfo>
  control: Control<UserInfo, any>
  setValue: UseFormSetValue<UserInfo>
  resetField: UseFormResetField<UserInfo>
  files: FileToSendType[]
  setFiles: Dispatch<SetStateAction<FileToSendType[]>>
  filesToDelete: FileToSendType[]
  setFilesToDelete: Dispatch<SetStateAction<FileToSendType[]>>
}

export const EditProfileContext = createContext<EditProfileContextProps>({} as EditProfileContextProps)

export const EditProfile = () => {
  const [formStep, setFormStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const userInfo = useSelector(UserSelectors.selectUserData)
  const userId = useSelector(UserSelectors.selectUserId);
  const [isFormSending, setIsFormSending] = useState(false);

  const { handleSubmit, watch, control, setValue, resetField } = useForm<UserInfo>({
    mode: "onBlur",
    defaultValues: {
      department: userInfo?.department ?? "",
      department_code: userInfo?.department_code ?? "",
      inn: userInfo?.inn ?? undefined,
      issue_date_at: userInfo?.issue_date_at ?? "",
      juridical_address: userInfo?.juridical_address ?? "",
      name: userInfo?.name ?? "",
      patronymic: userInfo?.patronymic ?? "",
      surname: userInfo?.surname ?? "",
      accountant_phone: userInfo?.accountant_phone ?? "",
      bdate: userInfo?.bdate ?? "",
      director_name: userInfo?.director_name ?? "",
      director_surname: userInfo?.director_surname ?? "",
      email: userInfo?.email ?? "",
      full_name: userInfo?.full_name ?? "",
      gender: userInfo?.gender ?? "",
      region: userInfo?.region ?? "",
      short_name: userInfo?.short_name ?? "",
      number: userInfo?.number,
      office_address: userInfo?.office_address ?? "",
      ogrn: userInfo?.ogrn,
      okved: userInfo?.okved ?? "",
      series: userInfo?.series,
      snils: userInfo?.snils ?? "",
      tax_system: userInfo?.tax_system ?? "",
      type: userInfo?.type,
      kpp: userInfo?.kpp,
      cfull_name: userInfo?.cfull_name,
      cinn: userInfo?.cinn,
      cregion: userInfo?.cregion,
      cshort_name: userInfo?.cshort_name
    }
  });

  const [files, setFiles] = useState<FileToSendType[]>(
    userInfo?.files?.map((file) => ({ file_type: file.type, file_id: file.id })) ?? []
  )

  const [filesToDelete, setFilesToDelete] = useState<FileToSendType[]>([])

  const [avatar, setAvatar] = useState<File>();

  const initialAvatar = userInfo?.files?.find((file) => file.type === 'Аватар')?.path_url ?? '';

  const dispatch = useAppDispatch()

  const { handleSendData: changeAvatar } = useSendData(
    {
      url: `/api/v1/userprofile/avatar/${initialAvatar ? 'update' : 'create'}`,
      withAuthToken: true,
    }
  )

  const { handleSendData: createFiles } = useSendData({
    url: "/api/v1/files/load-files",
    withAuthToken: true
  })

  const { handleSendData: updateFiles } = useSendData(
    {
      url: "/api/v1/files/update-files",
      withAuthToken: true,
    }
  )

  const { handleSendData: deleteFiles } = useSendData(
    {
      url: "/api/v1/files/delete-files",
      withAuthToken: true,
      method: "DELETE",
      //@ts-ignore
      params: { file_id: filesToDelete.map(item => item.file_id).filter(Boolean) }
    }
  )

  const handleSendFiles = async (files: FileToSendType[]) => {
    const filteredFiles = files.filter((file) => file.file_type);

    const filesToLoad = filteredFiles.filter(item => !item?.file_id)

    const filesToUpdate = filteredFiles.filter(item => item?.file_id && item.file)

    if (filesToLoad.length) await createFiles({ documents: filesToLoad })
    if (filesToUpdate.length) await updateFiles({ documents: filesToUpdate })
  }

  const { handleSendData } = useSendData(
    {
      url: `/api/v1/counteragents/${userInfo?.id}`,
      withAuthToken: true,
      method: "PUT",
      type: "x-www-form-urlencoded",
      onSuccess: async () => {
        if (avatar) await changeAvatar({ avatar })
        if (files.length) await handleSendFiles(files)
        if (filesToDelete.length) await deleteFiles({})

        dispatch(addNotification({ message: 'Данные профиля успешно изменены', type: NotificationType.Success }));
        navigate(`${RouterPaths.PROFILE}/${userId}`)
        dispatch(fetchUserData())
        setIsFormSending(false)
      },
      onError: () => {
        setIsFormSending(false)
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
        navigate(`${RouterPaths.PROFILE}/${userId}`)
        dispatch(fetchUserData())
      }
    }
  )

  const closeForm = () => {
    navigate(`${RouterPaths.PROFILE}/${userId}`)
  }

  const onDeleteProfile = () => {
    deleteProfile({})
  }

  const changeStep = (number: number) => {
    if (formRef.current) {
      formRef.current.scrollTo(0, 0);
    }
    setFormStep(number);
  }

  const FormContent = () => {
    switch (formStep) {
      case 1: return <StepOne onCancel={closeForm} onDeleteProfile={onDeleteProfile} />
      case 2: return <StepTwo onPrev={() => changeStep(1)} isLoading={isFormSending} onDeleteProfile={onDeleteProfile} />
      case 3: return <StepThree onPrev={() => changeStep(2)} isLoading={isFormSending} onDeleteProfile={onDeleteProfile} />
      default: return null
    }
  }

  const onFormSend = (data: UserInfo) => {
    setIsFormSending(true);
    handleSendData({
      ...data,
      director_name: data.name,
      director_surname: data.surname,
      director_lastname: data.patronymic,
    })
  }

  const onSubmit = () => {
    switch (formStep) {
      case 1: return () => changeStep(2);
      case 2: return () => changeStep(3);
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
        <EditProfileContext.Provider value={{ watch, control, setValue, resetField, files, setFiles, filesToDelete, setFilesToDelete }}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit(onSubmit())}>
            {FormContent()}
          </form>
        </EditProfileContext.Provider>
      </CardContainer>
    </div>
  )
}
