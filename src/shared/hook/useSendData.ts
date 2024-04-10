import { sendData, sendDataParams } from "@shared/lib/api";
/* import {NotificationType, useNotification} from "@providers/NotificationsProvider"; */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSelectors } from "@entities/User";
import { Nullable } from "@shared/lib/globalTypes";
import { NotificationType, addNotification } from "@entities/Notifications";
/* import {useSession} from "next-auth/react"; */

interface useSendDataProps<T> extends Omit<sendDataParams<T>, "data"> {
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  withAuthToken?: boolean
  successNotification?: string
}

export const useSendData = <DataType extends {}>
  ({
    onSuccess,
    onError,
    withAuthToken,
    successNotification,
    headers = {},
    ...otherParams
  }: useSendDataProps<DataType>) => {
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);
  const [responseData, setResponseData] = useState<any>();
  const token = useSelector(UserSelectors.selectToken);
  const dispatch = useDispatch();


  const handleSendData = async (data: DataType) => {
    try {
      const headersWithAuth = (withAuthToken && token) ? { ...headers, Authorization: `Bearer ${token}` } : headers;
      setIsSending(true);
      const response = await sendData({ data, headers: headersWithAuth, ...otherParams })

      setIsSuccess(true);
      onSuccess?.(response);
      setResponseData(response);
      successNotification && dispatch(addNotification({ message: successNotification, type: NotificationType.Success }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(addNotification({ message: error.message, type: NotificationType.Error }))
        setError(error.message)
        setIsError(true);
        onError?.(error);
      }
    } finally {
      setIsSending(false);
    }
  }

  return { isSuccess, isSending, handleSendData, isError, error, responseData } as const
}