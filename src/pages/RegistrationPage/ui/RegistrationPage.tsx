import cn from 'classnames';
import styles from './RegistrationPage.module.scss'
import Logo from '@shared/images/logo.svg'
import { RegistrationForm } from '@features/RegistrationForm';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@shared/hook/useLocalStorage';
import { CodeValidationForm } from '@features/CodeValidationForm';
import { LSKeys } from "@shared/lib/globalVariables";
import { useSelector } from "react-redux";
import { UserSelectors, fetchUserData } from "@entities/User";
import { Navigate } from "react-router-dom";
import { RouterPaths } from "@src/app/router";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { useAppDispatch } from '@src/app/store/model/hook';

interface RegistrationPageProps {
  className?: string;
}

export const RegistrationPage = (props: RegistrationPageProps) => {
  const { className } = props;
  const [phoneNumber] = useLocalStorage(LSKeys.PHONE_NUMBER_TO_CONFIRM, null);
  const [step, setStep] = useState(phoneNumber ? 2 : 1)

  const token = useSelector(UserSelectors.selectToken);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(UserSelectors.selectIsUserDataLoading)
  const user = useSelector(UserSelectors.selectUserData)

  useEffect(() => {
    if (token) dispatch(fetchUserData())
  }, [dispatch])

  if (isLoading) return <LoadingBlock />

  if (user) return <Navigate to={RouterPaths.MAIN} replace={true} />

  /*useSetDocumentTitle("Вход");*/

  const CurrentStepAuthForm = () => {
    switch (step) {
      case 1: return <RegistrationForm nextStep={() => setStep(2)} />
      case 2: return <CodeValidationForm />
      default: return null
    }
  }

  return (
    <div className={cn(styles.registrationPage, className)}>
      <Logo width={110} height={60} className={styles.logo} />
      {CurrentStepAuthForm()}
    </div>
  )
}
