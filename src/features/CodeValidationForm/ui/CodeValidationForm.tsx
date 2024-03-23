import cn from 'classnames';
import styles from './CodeValidationForm.module.scss'
import { Input } from '@shared/ui/Input';
import { Title } from '@shared/ui/Title';
import { useLocalStorage } from '@shared/hook/useLocalStorage';
import { useForm } from 'react-hook-form';
import { PinConfirmInput } from '@shared/ui/PinConfirmInput';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { useSendData } from '@shared/hook/useSendData';
import { LSKeys } from "@shared/lib/globalVariables";
import { CodeValidationFormState } from '../model/codeValidationForm.model';
import { useDispatch } from 'react-redux';
import { setToken } from '@entities/User/model/User.slice';

interface CodeValidationFormProps {
  className?: string;
}

export const CodeValidationForm = (props: CodeValidationFormProps) => {
  const { className } = props;
  const [phoneNumber, , deleteNumber] = useLocalStorage(LSKeys.PHONE_NUMBER_TO_CONFIRM, null);
  const dispatch = useDispatch();

  const { watch, setValue } = useForm<CodeValidationFormState>();

  const code: string = watch('code')

  const { isSending } = useSendData({
    url: "/api/v1/login/verification",
    onSuccess: ({ data: { token } }) => {
      dispatch(setToken(token))
      deleteNumber()
    }
  });

  return (
    <form className={cn(styles.codeValidationForm, className)}>
      <Title>Вход</Title>
      <p className={styles.text}>Мы отправили вам СМС с кодом подтверждения <br /> на этот номер {phoneNumber}</p>
      <PinConfirmInput name='code' value={code} setValue={(value) => setValue('code', value)} />
      <Button
        className={styles.submitBtn}
        theme={ButtonTheme.ACCENT}
        size={ButtonSize.M}
        isLoading={isSending}
        disabled={code?.length !== 4 ?? true}
        fullWidth
      >
        Подтвердить
      </Button>
    </form>
  )
}
