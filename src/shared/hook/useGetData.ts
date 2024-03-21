import {getData} from "@shared/lib/api";
/* import {NotificationType, useNotification} from "@providers/NotificationsProvider"; */
import {useEffect, useState} from "react";
/* import {useSession} from "next-auth/react"; */

interface useGetDataProps {
  url: string,
  defaultErrorMessage?: string
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  withAuthToken?: boolean
  params?: Record<string, string | number | undefined>
  isEnabled?: boolean
  headers?: Record<string, string>
}

export const useGetData = <DataType extends {}>
({
   defaultErrorMessage = "Произошла ошибка при получении данных",
   url,
   onSuccess,
   onError,
   withAuthToken,
   params,
   isEnabled = true,
   headers = {},
 }: useGetDataProps) => {
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataType>();
  /* const {addNotification} = useNotification(); */

 /*  const {data: sessionData} = useSession(); */

  useEffect(() => {
    if (isEnabled) {
      (async function () {
        try {
          /* const headers = (withAuthToken && sessionData?.user.token) ? {Authorization: `Bearer ${sessionData.user.token}`} : undefined; */
          setIsSending(true);
          const response = await getData<DataType>({url, headers, defaultErrorMessage, params})

          setIsSuccess(true);
          onSuccess?.(response);
          setData(response);
        } catch (error) {
          if (error instanceof Error) {
           /*  addNotification(error.message, NotificationType.Error); */
            setError(error.message)
            setIsError(true);
            onError?.(error);
          }
        } finally {
          setIsSending(false);
        }
      })()
    }
  }, [isEnabled]);

  return {isSuccess, isSending, data, isError, error} as const
}