import cn from 'classnames';
import styles from './NewApplication.module.scss'
import { CardContainer } from '@shared/ui/CardContainer';
import { Title, TitleSize } from '@shared/ui/Title';
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { FormStepOne } from './FormStepOne';
import { FormStepTwo } from './FormStepTwo';
import { FormStepThree } from './FormStepThree';
import { AdditionalStepOne } from './AdditionalStepOne';
import { AdditionalStepTwo } from './AdditionalStepTwo';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseButton } from '@shared/ui/CloseButton';
import { useDocumentEvent } from '@shared/hook/useDocumentEvent';
import { Control, UseFormResetField, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { ApplicationModel, Coord } from '@entities/Application/model/application.model';
import { Stepper } from "@shared/ui/Stepper";
import { Step } from "@shared/ui/Stepper/Step";
import { useSendData } from '@shared/hook/useSendData';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType, addNotification } from '@entities/Notifications';
import { RouterPaths } from '@src/app/router';
import { FormStepFour } from './FormStepFour';
import { Role, UserSelectors } from '@entities/User';

interface NewApplicationProps {
  className?: string;
}

type Coords = { from: Coord, to: Coord };

interface NewApplicationContextProps {
  watch: UseFormWatch<ApplicationModel>
  control: Control<ApplicationModel, any>
  setValue: UseFormSetValue<ApplicationModel>
  resetField: UseFormResetField<ApplicationModel>
  coords?: Partial<Coords>;
  handleCoordsChange?: (value: Coord, name: keyof Coords) => void
}

export const NewApplicationContext = createContext<NewApplicationContextProps>({} as NewApplicationContextProps)

export const NewApplication = (props: NewApplicationProps) => {
  const { className } = props;
  const [formStep, setFormStep] = useState(1);
  const navigate = useNavigate();
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>(null);

  const [coords, setCoords] = useState<Partial<Coords>>()

  const handleCoordsChange = (value: Coord, name: keyof Coords) => {
    setCoords(prev => {
      if (prev) return { ...prev, [name]: value }
      return { [name]: value }
    })
  }

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const dispatch = useDispatch();

  const closeForm = () => {
    if (state?.allowPrevUrl) navigate(-1)
    else navigate(RouterPaths.MAIN)
  }

  const { handleSubmit, watch, control, setValue, resetField } = useForm<ApplicationModel>({
    mode: "onBlur", defaultValues: {
      unit_of_measurement_for_cargo_shortage_rate: "%",
    }
  });

  const changeStep = (number: number) => () => {
    if (formRef.current) {
      formRef.current.scrollTo(0, 0);
    }
    return setFormStep(number)
  }

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
      case 3: return <FormStepThree prevStep={changeStep(2)} />
      case 4: return <FormStepFour prevStep={changeStep(3)} toAdditional={changeStep(5)} isLoading={isSending} />
      case 5: return <AdditionalStepOne toMainPart={changeStep(4)} />
      case 6: return <AdditionalStepTwo toMainPart={changeStep(4)} prevStep={changeStep(5)} isLoading={isSending} />
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
      case 3: return () => changeStep(4)();
      case 5: return () => changeStep(6)();
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

  const userRole = useSelector(UserSelectors.selectUserRole)

  useLayoutEffect(() => {
    /* userRole !== Role.LOGIST && navigate(RouterPaths.MAIN) */
  }, [userRole])

  return (
    <div className={cn(styles.newApplication, className)}>
      <CardContainer className={styles.container}>
        <CloseButton onClick={closeForm} className={styles.closeBtn} />
        <Title size={TitleSize.S}>Новая заявка</Title>
        {formStep <= 4 &&
          <Stepper className={styles.stepper} value={formStep}>
            <Step value={1} />
            <Step value={2} />
            <Step value={3} />
            <Step value={4} />
          </Stepper>
        }
        <NewApplicationContext.Provider value={{ watch, control, setValue, resetField, coords, handleCoordsChange }}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit(onSubmit())}>
            {FormContent()}
          </form>
        </NewApplicationContext.Provider>
      </CardContainer>
    </div>
  )
}
