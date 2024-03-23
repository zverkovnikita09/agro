import cn from 'classnames';
import styles from './RegistrationForm.module.scss'
import { Input } from '@shared/ui/Input';
import { useForm } from 'react-hook-form';
import { Title } from '@shared/ui/Title';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useSendData } from '@shared/hook/useSendData';
import { useEffect } from 'react';
import { useDebounce } from '@shared/hook/useDebounce';
import { useLocalStorage } from '@shared/hook/useLocalStorage';

interface RegistrationFormProps {
  className?: string;
  nextStep?: () => void
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { className, nextStep } = props;
  const [, setPhoneNumber] = useLocalStorage("phoneNumberToConfirm", null);

  const { register, formState: { errors }, handleSubmit, getValues } = useForm();

  /* const { handleSendData: getCompaniesByInn } = useSendData(
    {
      url: "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party",
      baseUrl: "",
      headers: {
        Authorization: 'Token 68137e7299f43f1d4869c08e43345f085af8fdf0',
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      type: "JSON",
    }) */

  const { handleSendData, isSending } = useSendData({
    url: "", onSuccess: () => {
      setPhoneNumber(getValues("phone"))
      nextStep()
    }
  })

  /* const inn: string = watch('inn');

  const deb = useDebounce(() => getCompaniesByInn({ query: inn, count: 20 }), 300)

  useEffect(() => {
    if (typeof inn !== "undefined") {
      deb()
    }
  }, [inn]) */

  return (
    <form className={cn(styles.registrationForm, className)} onSubmit={handleSubmit(handleSendData)}>
      <Title>Вход</Title>
      <p className={styles.text}>Сельхоз-хозяйственные грузоперевозки <br /> по всей России</p>
      {/* <Input
        placeholder='Введите ваш ИНН'
        {...register("inn", { required: true })}
        error={errors?.phone?.message as string}
        type='tel'
        mask='999999999999'
        maskChar={null}
      /> */}
      <Input
        placeholder='Ваш номер телефона'
        mask="+7 (999) 999-99-99"
        type='tel'
        {...register('phone', {
          required: 'Необходимо заполнить номер телефона.',
          pattern: {
            value: /^[^_]*$/,
            message: 'Необходимо заполнить номер телефона.'
          }
        })}
        error={errors?.phone?.message as string}
      />
      <Button
        className={styles.submitBtn}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        isLoading={isSending}
        fullWidth
      >
        Далее
      </Button>
    </form>
  )
}
