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

interface CodeValidationFormProps {
  className?: string;
}

export const CodeValidationForm = (props: CodeValidationFormProps) => {
  const { className } = props;
  const [phoneNumber, setNumber] = useLocalStorage(LSKeys.PHONE_NUMBER_TO_CONFIRM, null);
  const [, setAuthToken] = useLocalStorage(LSKeys.TOKEN, null)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { watch, setValue, handleSubmit } = useForm<CodeValidationFormState>();

  const code: string = watch('code')

  const { isSending, handleSendData } = useSendData({
    url: "/api/v1/login/verification",
    onSuccess: ({ data: { token, user } }) => {
      dispatch(setToken(token));
      setAuthToken(token);
      dispatch(setUser(user));
      navigate('/');
      setNumber(null);
    }
  });

  const onSubmit = ({ code }: CodeValidationFormState) => {
    handleSendData({ code, phone_number: phoneNumber })
  }

  return (
    <form className={cn(styles.codeValidationForm, className)} onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход</Title>
      <p className={styles.text}>Мы отправили вам СМС с кодом подтверждения <br /> на этот номер {phoneNumber}</p>
      <PinConfirmInput cellCount={5} name='code' value={code} setValue={(value) => setValue('code', value)} />
      <Button
        className={styles.submitBtn}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        isLoading={isSending}
        disabled={code?.length !== 5 ?? true}
        fullWidth
        type='submit'
      >
        Подтвердить
      </Button>
    </form>
  )
}
