import cn from 'classnames';
import styles from './NewApplication.module.scss'
import { CardContainer } from '@shared/ui/CardContainer';
import { Title, TitleSize } from '@shared/ui/Title';
import { useContext, useLayoutEffect, useState } from 'react';
import { FormStepOne } from './FormStepOne';
import { FormStepTwo } from './FormStepTwo';
import { FormStepThree } from './FormStepThree';
import { AdditionalStepOne } from './AdditionalStepOne';
import { AdditionalStepTwo } from './AdditionalStepTwo';
import { MainLayoutContext } from '@shared/ui/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseButton } from '@shared/ui/CloseButton';
import { useDocumentEvent } from '@shared/hook/useDocumentEvent';

interface NewApplicationProps {
  className?: string;
}

export const NewApplication = (props: NewApplicationProps) => {
  const { className } = props;
  const [formStep, setFormStep] = useState(5);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { openOverlay, closeOverlay } = useContext(MainLayoutContext);

  const closeForm = () => {
    if (state?.allowPrevUrl) navigate(-1)
    else navigate("/")
  }

  const changeStep = (number: number) => () => setFormStep(number)

  const FormContent = () => {
    switch (formStep) {
      case 1: return <FormStepOne nextStep={changeStep(2)} onCancel={closeForm} />
      case 2: return <FormStepTwo nextStep={changeStep(3)} prevStep={changeStep(1)} />
      case 3: return <FormStepThree prevStep={changeStep(2)} nextStep={changeStep(4)} />
      case 4: return <AdditionalStepOne toMainPart={changeStep(3)} nextStep={changeStep(5)} />
      case 5: return <AdditionalStepTwo toMainPart={changeStep(3)} prevStep={changeStep(4)} />
      default: return null
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
        <form className={styles.form}>
          {FormContent()}
        </form>
      </CardContainer>
    </div>
  )
}
