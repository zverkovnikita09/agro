import cn from 'classnames';
import styles from './NewApplication.module.scss'
import { CardContainer } from '@shared/ui/CardContainer';
import { Title, TitleSize } from '@shared/ui/Title';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { FormStepOne } from './FormStepOne';
import { FormStepTwo } from './FormStepTwo';
import { FormStepThree } from './FormStepThree';
import { AdditionalStepOne } from './AdditionalStepOne';
import { AdditionalStepTwo } from './AdditionalStepTwo';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseButton } from '@shared/ui/CloseButton';
import { useDocumentEvent } from '@shared/hook/useDocumentEvent';
import { Control, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { ApplicationModel } from '@entities/Application/model/application.model';
import { Stepper } from "@shared/ui/Stepper";
import { Step } from "@shared/ui/Stepper/Step";
import { useSendData } from '@shared/hook/useSendData';
import CheckedIcon from "@images/check-broken.svg";
import { Text, TextColor, TextSize, TextWeight } from '@shared/ui/Text';
import { useDispatch } from 'react-redux';
import { NotificationType, addNotification } from '@entities/Notifications';
import { RouterPaths } from '@src/app/router';

interface NewApplicationProps {
  className?: string;
}

interface NewApplicationContextPros {
  watch: UseFormWatch<ApplicationModel>
  control: Control<ApplicationModel, any>
  setValue: UseFormSetValue<ApplicationModel>
}

export const NewApplicationContext = createContext<NewApplicationContextPros>({} as NewApplicationContextPros)

export const NewApplication = (props: NewApplicationProps) => {
  const { className } = props;
  const [formStep, setFormStep] = useState(5);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const dispatch = useDispatch();

  const closeForm = () => {
    if (state?.allowPrevUrl) navigate(-1)
    else navigate(RouterPaths.MAIN)
  }

  const { handleSubmit, watch, control, setValue } = useForm<ApplicationModel>({
    mode: "onBlur", defaultValues: {
      unit_of_measurement_for_cargo_shortage_rate: "%",
      distance: Math.floor(Math.random() * (10000 - 500) + 500)
    }
  });

  const changeStep = (number: number) => () => setFormStep(number)

  const { handleSendData, isSending } = useSendData(
    {
      url: "/api/v1/orders/create",
      withAuthToken: true,
      onSuccess: (res) => {
        dispatch(addNotification({ message: `Заявка №${res?.data?.[0]?.order_number} создана`, type: NotificationType.Success }));
        navigate(RouterPaths.CHECKLIST)
      }
    }
  )

  const FormContent = () => {
    switch (formStep) {
      case 1: return <FormStepOne onCancel={closeForm} />
      case 2: return <FormStepTwo prevStep={changeStep(1)} />
      case 3: return <FormStepThree prevStep={changeStep(2)} toAdditional={changeStep(4)} isLoading={isSending} />
      case 4: return <AdditionalStepOne toMainPart={changeStep(3)} />
      case 5: return <AdditionalStepTwo toMainPart={changeStep(3)} prevStep={changeStep(4)} isLoading={isSending} />
      default: return null
    }
  }

  const onFormSend = (data: ApplicationModel) => {
    handleSendData(data)
  }

  const onSubmit = () => {
    switch (formStep) {
      case 1: return () => changeStep(2)();
      case 2: return () => changeStep(3)();
      case 4: return () => changeStep(5)();
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

  /* if (isSuccess) return (
    <div className={cn(styles.newApplication, className)}>
      <div className={styles.successPopup}>
        <CheckedIcon width={46} height={40} />
        <div className={styles.successContent}>
          <Text
            as="p"
            size={TextSize.XL}
            weight={TextWeight.SEMI_BOLD}
          >
            Заявка №{responseData?.data?.[0]?.order_number ?? ""} создана
          </Text>
          <Text
            as="p"
            size={TextSize.M}
            weight={TextWeight.MEDIUM}
            color={TextColor.GREY}
          >
            Вы успешно создали заявку, она скоро появится в общем списке
          </Text>
        </div>
      </div>
    </div>
  ) */

  return (
    <div className={cn(styles.newApplication, className)}>
      <CardContainer className={styles.container}>
        <CloseButton onClick={closeForm} className={styles.closeBtn} />
        <Title size={TitleSize.S}>Новая заявка</Title>
        {formStep <= 3 &&
          <Stepper className={styles.stepper} value={formStep}>
            <Step value={1} />
            <Step value={2} />
            <Step value={3} />
          </Stepper>
        }
        <NewApplicationContext.Provider value={{ watch, control, setValue }}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit())}>
            {FormContent()}
          </form>
        </NewApplicationContext.Provider>
      </CardContainer>
    </div>
  )
}
