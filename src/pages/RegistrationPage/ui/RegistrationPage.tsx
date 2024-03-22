import cn from 'classnames';
import styles from './RegistrationPage.module.scss'
import Logo from '@shared/images/logo.svg'
import { RegistrationForm } from '@features/RegistrationForm';
import { useSetDocumentTitle } from '@shared/hook/useSetDocumentTitle';
import { useState } from 'react';
import { useLocalStorage } from '@shared/hook/useLocalStorage';
import { CodeValidationForm } from '@features/CodeValidationForm';
import {LSKeys} from "@shared/lib/globalVariables";



interface RegistrationPageProps {
  className?: string;
}

export const RegistrationPage = (props: RegistrationPageProps) => {
  const { className } = props;
  const [phoneNumber] = useLocalStorage(LSKeys.PHONE_NUMBER_TO_CONFIRM, null);
  const [step, setStep] = useState(phoneNumber ? 2 : 1)

  useSetDocumentTitle("Авторизация");

  const CurrentStepAuthForm = () => {
    switch (step) {
      case 1: return <RegistrationForm nextStep={() => setStep(2)} />
      case 2: return <CodeValidationForm />
      default: return null
    }
  }

  return (
    <div className={cn(styles.registrationPage, className)}>
      <Logo width={110} height={40} className={styles.logo} />
      {CurrentStepAuthForm()}
    </div>
  )
}
