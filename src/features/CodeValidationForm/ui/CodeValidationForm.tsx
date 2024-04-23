import cn from 'classnames';
import styles from './CodeValidationForm.module.scss'
import { Title } from '@shared/ui/Title';
import { useLocalStorage } from '@shared/hook/useLocalStorage';
import { useForm } from 'react-hook-form';
import { PinConfirmInput } from '@shared/ui/PinConfirmInput';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useSendData } from '@shared/hook/useSendData';
import { LSKeys } from "@shared/lib/globalVariables";
import { CodeValidationFormState } from '../model/codeValidationForm.model';
import { setToken, setUser } from '@entities/User';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '@src/app/store/model/hook';
import { useEffect, useState } from "react";
import { Text, TextSize } from "@shared/ui/Text";
import { RouterPaths } from '@src/app/router';

interface CodeValidationFormProps {
  className?: string;
}

export const CodeValidationForm = (props: CodeValidationFormProps) => {
  const { className } = props;
  const [phoneNumber, setNumber] = useLocalStorage(LSKeys.PHONE_NUMBER_TO_CONFIRM, null);
  const [, setAuthToken] = useLocalStorage(LSKeys.TOKEN, null)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [timerTime, setTimerTime] = useLocalStorage(LSKeys.TIMER_STATE, null);
  const [seconds, setSeconds] = useState(timerTime);

  const formatTime = (time: number) => time > 9 ? time : `0${time}`;

  useEffect(() => {
    if (timerTime === null || timerTime < Date.now()) {
      setSeconds(0);
      return;
    }

    const timeLeft = Math.floor((timerTime - Date.now()) / 1000)
    setSeconds(timeLeft);

    let interval = setInterval(() => {
      setSeconds((seconds: number) => seconds - 1)
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, timerTime]);

  const {
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors
  } = useForm<CodeValidationFormState>();

  const code: string = watch('code')

  const { isSending, handleSendData } = useSendData({
    url: "/api/v1/login/verification",
    disableNotification: true,
    onSuccess: ({ data: { token, user } }) => {
      dispatch(setToken(token));
      setAuthToken(token);
      dispatch(setUser(user));
      navigate(RouterPaths.MAIN);
      setNumber(null);
    },
    onError: () => {
      setError("code", {
        type: "custom",
        message: "Неверный код подтверждения",
      })
    }
  });

  const { handleSendData: handleResendCode, isSending: isResending } = useSendData({
    url: "/api/v1/login", onSuccess: ({ data: { user: { code } } }) => {
      alert(code)
    }
  })

  const onSubmit = ({ code }: CodeValidationFormState) => {
    clearErrors();
    handleSendData({ code, phone_number: phoneNumber });
  }

  const onResendCode = () => {
    handleResendCode({ code, phone_number: phoneNumber });
    setTimerTime(Date.now() + 30000)
  }

  const onChangeNumber = () => {
    setNumber(null);
    navigate(RouterPaths.MAIN);
  }

  useEffect(() => {
    clearErrors();
  }, [code]);

  return (
    <form className={cn(styles.codeValidationForm, className)} onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход</Title>
      <Text as="p" size={TextSize.L} className={styles.text}>Мы отправили вам СМС с кодом подтверждения <br /> на этот номер {phoneNumber}</Text>
      <PinConfirmInput
        cellCount={5}
        error={errors.code?.message}
        name='code'
        value={code}
        setValue={(value) => setValue('code', value)}
      />
      {seconds !== 0
        ? <Text size={TextSize.L} className={styles.count}>Отправить повторно через 00:{formatTime(seconds)}</Text>
        :
        <Button
          className={styles.resend}
          onClick={onResendCode}
          isLoading={isResending}
        >
          Запросить повторно
        </Button>
      }
      <Button
        className={styles.btn}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        isLoading={isSending}
        disabled={code?.length !== 5 ?? true}
        fullWidth
        type='submit'
      >
        Подтвердить
      </Button>
      <Button
        className={styles.btn}
        theme={ButtonTheme.OUTLINE}
        size={ButtonSize.M}
        isLoading={isSending}
        fullWidth
        onClick={onChangeNumber}
      >
        Сменить номер для отправки
      </Button>
    </form>
  )
}
