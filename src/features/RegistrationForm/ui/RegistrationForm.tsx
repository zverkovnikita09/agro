import cn from 'classnames';
import styles from './RegistrationForm.module.scss'
import { Input } from '@shared/ui/Input';
import { useForm } from 'react-hook-form';
import { Title } from '@shared/ui/Title';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';

interface RegistrationFormProps {
  className?: string;
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { className } = props;

  const { register, formState: { errors } } = useForm();

  return (
    <form className={cn(styles.registrationForm, className)}>
      <Title>Регистрация</Title>
      <p className={styles.text}>Сельхоз-хозяйственные грузоперевозки <br /> по всей России</p>
      <Input placeholder='Введите ваш ИНН' />
      <Input placeholder='Ваш номер телефона' mask="+7 (999) 999-99-99" type='tel'
        {...register('phone', {
          required: 'Необходимо заполнить номер телефона.',
          pattern: {
            value: /^[^_]*$/,
            message: 'Необходимо заполнить номер телефона.'
          }
        })} />
      <Button
        className={styles.submitBtn}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        fullWidth
        isLoading
      >
        Далее
      </Button>
    </form>
  )
}
