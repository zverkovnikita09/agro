import {getData, GetDataParams} from "@shared/lib/api";
/* import {NotificationType, useNotification} from "@providers/NotificationsProvider"; */
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {UserSelectors} from "@entities/User";
import { Nullable } from "@shared/lib/globalTypes";
/* import {useSession} from "next-auth/react"; */

interface useGetDataProps extends GetDataParams{
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  withAuthToken?: boolean
  isEnabled?: boolean
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
   ...otherParams
 }: useGetDataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);
  const [data, setData] = useState<DataType>();
  const token = useSelector(UserSelectors.selectToken);
  /* const {addNotification} = useNotification(); */

  useEffect(() => {
    if (isEnabled) {
      (async function () {
        try {
          const headersWithAuth = (withAuthToken && token) ? {...headers, Authorization: `Bearer ${token}`} : headers;
          setIsLoading(true);
          const response = await getData<DataType>({url, headers: headersWithAuth, defaultErrorMessage, params, ...otherParams})

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
          setIsLoading(false);
        }
      })()
    }
  }, [isEnabled]);

  return {isSuccess, isLoading, data, isError, error} as const
}