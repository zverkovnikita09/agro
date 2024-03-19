import cn from 'classnames';
import styles from './RegistrationPage.module.scss'
import Logo from '@shared/images/logo.svg'
import {Input} from "@shared/ui/Input";



interface RegistrationPageProps {
  className?: string;
}

export const RegistrationPage = (props: RegistrationPageProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.registrationPage, className)}>
      <Logo width={110} height={40} />
      <form>
        <Input/>

      </form>
    </div>
  )
}
