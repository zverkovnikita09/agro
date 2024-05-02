import styles from './EditProfile.module.scss'
import { Control, UseFormResetField, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useDocumentEvent } from '@shared/hook/useDocumentEvent';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouterPaths } from '@src/app/router';
import { CardContainer } from '@shared/ui/CardContainer';
import { CloseButton } from '@shared/ui/CloseButton';
import { Title, TitleSize } from '@shared/ui/Title';
import { UserPhoto } from '@shared/ui/UserPhoto';
import { Text, TextColor, TextSize } from '@shared/ui/Text';
import { StepOne } from './StepOne';
import { UserInfo } from '@entities/User';
import { StepTwo } from './StepTwo';
import { useSendData } from '@shared/hook/useSendData';
import { useDispatch } from 'react-redux';
import { NotificationType, addNotification } from '@entities/Notifications';

interface EditProfileContextProps {
  watch: UseFormWatch<UserInfo>
  control: Control<UserInfo, any>
  setValue: UseFormSetValue<UserInfo>
  resetField: UseFormResetField<UserInfo>
}

export const EditProfileContext = createContext<EditProfileContextProps>({} as EditProfileContextProps)

export const EditProfile = () => {
  const [formStep, setFormStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const { handleSubmit, watch, control, setValue, resetField } = useForm<UserInfo>({
    mode: "onBlur", /* defaultValues: {
      unit_of_measurement_for_cargo_shortage_rate: "%",
    } */
  });

  const dispatch = useDispatch()

  const { handleSendData, isSending } = useSendData(
    {
      url: "/api/v1/userprofile/update",
      withAuthToken: true,
      onSuccess: () => {
        dispatch(addNotification({ message: 'Данные профиля успешно изменены', type: NotificationType.Success }));
        navigate(RouterPaths.LK)
      }
    }
  )

  const closeForm = () => {
    navigate(RouterPaths.LK)
  }

  const FormContent = () => {
    switch (formStep) {
      case 1: return <StepOne onCancel={closeForm} />
      case 2: return <StepTwo onPrev={() => setFormStep(1)} isLoading={isSending} />
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
        <CloseButton onClick={closeForm} className={styles.closeBtn} />
        <div className={styles.heading}>
          <UserPhoto editable />
          <div className={styles.headingInfo}>
            <Title size={TitleSize.S}>Личный кабинет</Title>
            <Text color={TextColor.GREY} size={TextSize.XL}>Заполните свои личные данные</Text>
          </div>
        </div>
        <EditProfileContext.Provider value={{ watch, control, setValue, resetField }}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit(onSubmit())}>
            {FormContent()}
          </form>
        </EditProfileContext.Provider>
      </CardContainer>
    </div>
  )
}
