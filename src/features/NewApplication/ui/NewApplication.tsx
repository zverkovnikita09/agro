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
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { ApplicationModel } from '@entities/Application/model/application.model';
import {Stepper} from "@shared/ui/Stepper";
import {Step} from "@shared/ui/Stepper/Step";

interface NewApplicationProps {
  className?: string;
}

interface NewApplicationContextPros {
  watch: UseFormWatch<ApplicationModel>
  register: UseFormRegister<ApplicationModel>
  control: Control<ApplicationModel, any>
  setValue: UseFormSetValue<ApplicationModel>
}

export const NewApplicationContext = createContext<NewApplicationContextPros>({} as NewApplicationContextPros)

export const NewApplication = (props: NewApplicationProps) => {
  const { className } = props;
  const [formStep, setFormStep] = useState(2);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const closeForm = () => {
    if (state?.allowPrevUrl) navigate(-1)
    else navigate("/")
  }

  const { handleSubmit, watch, control, register, setValue } = useForm<ApplicationModel>({ mode: "onBlur", defaultValues: {
    /* nds_percent: 0,
    volume: 0,
    tariff: 0 */
    unit_of_measurement_for_cargo_shortage_rate: "%"
  } });

  const changeStep = (number: number) => () => setFormStep(number)

  const FormContent = () => {
    switch (formStep) {
      case 1: return <FormStepOne onCancel={closeForm} />
      case 2: return <FormStepTwo prevStep={changeStep(1)} />
      case 3: return <FormStepThree prevStep={changeStep(2)} toAdditional={changeStep(4)} />
      case 4: return <AdditionalStepOne toMainPart={changeStep(3)} />
      case 5: return <AdditionalStepTwo toMainPart={changeStep(3)} prevStep={changeStep(4)} />
      default: return null
    }
  }

  const onFormSend = () => {

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
        <NewApplicationContext.Provider value={{ watch, control, register, setValue }}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit())}>
            {FormContent()}
          </form>
        </NewApplicationContext.Provider>
      </CardContainer>
    </div>
  )
}
