import cn from 'classnames';
import { Input } from '@shared/ui/Input';
import { Controller, useForm } from 'react-hook-form';
import { Title } from '@shared/ui/Title';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useSendData } from '@shared/hook/useSendData';
import { useLocalStorage } from '@shared/hook/useLocalStorage';
import { LSKeys } from "@shared/lib/globalVariables";
import { RegistrationFormState } from '../model/registrationForm.model';
import { Text, TextSize } from "@shared/ui/Text";
import styles from './RegistrationForm.module.scss'
import { useEffect, useState } from 'react';
import { ErrorBlock } from '@shared/ui/ErrorBlock';

interface RegistrationFormProps {
  className?: string;
  nextStep?: () => void
}

export const RegistrationForm = (props: RegistrationFormProps) => {
  const { className, nextStep } = props;
  const [, setPhoneNumber] = useLocalStorage(LSKeys.PHONE_NUMBER_TO_CONFIRM, null);
  const [, setTimerTime] = useLocalStorage(LSKeys.TIMER_STATE, null);
  const [formError, setFormError] = useState<string | null>(null)

  const { handleSubmit, getValues, control } = useForm<RegistrationFormState>({ defaultValues: { phone_number: '' } });

  const { handleSendData, isSending } = useSendData({
    url: "/api/v1/login",
    disableNotification: true,
    onSuccess: ({ data: { user: { code } } }) => {
      setPhoneNumber(getValues("phone_number"))
      _MODE_ === "development" && alert(code)
      setTimerTime(Date.now() + 30000)
      nextStep?.()
    },
    onError: (error) => setFormError(error.message),
  })

  const sendData = (data: RegistrationFormState) => {
    setFormError(null)
    handleSendData(data)
  }

  return (
    <form className={cn(styles.registrationForm, className)} onSubmit={handleSubmit(sendData)}>
      <Title>Вход</Title>
      <Text as="p" size={TextSize.L} className={styles.text}>Сельхоз-хозяйственные грузоперевозки <br /> по всей России</Text>
      {formError && <ErrorBlock className={styles.formError}>{formError}</ErrorBlock>}
      <Controller
        name="phone_number"
        control={control}
        rules={{
          required: 'Необходимо заполнить номер телефона.', pattern: {
            value: /^[^_]*$/,
            message: 'Необходимо заполнить номер телефона.'
          }
        }}
        render={({ formState: { errors }, field: { value, onChange } }) => (
          <Input
            placeholder='Ваш номер телефона'
            mask="+79999999999"
            type='tel'
            value={value}
            onChange={onChange}
            error={errors?.phone_number?.message as string}
          />
        )}
      />
      <Button
        className={styles.submitBtn}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        isLoading={isSending}
        fullWidth
        type='submit'
      >
        Далее
      </Button>
    </form>
  )
}
