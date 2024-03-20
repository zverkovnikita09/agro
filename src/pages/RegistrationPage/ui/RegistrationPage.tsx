import cn from 'classnames';
import styles from './RegistrationPage.module.scss'
import Logo from '@shared/images/logo.svg'
import { RegistrationForm } from '@features/RegistrationForm';
import { useSetDocumentTitle } from '@shared/hook/useSetDocumentTitle';



interface RegistrationPageProps {
  className?: string;
}

export const RegistrationPage = (props: RegistrationPageProps) => {
  const { className } = props;

  useSetDocumentTitle("Регистрация");

  return (
    <div className={cn(styles.registrationPage, className)}>
      <Logo width={110} height={40} className={styles.logo}/>
      <RegistrationForm className={styles.form} />
    </div>
  )
}
