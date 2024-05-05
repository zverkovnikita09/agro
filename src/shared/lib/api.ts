import { formatArrayToFormData } from "./formDataUtils"
import { generateUrlParams } from "./generateUrlParams"

export interface GetDataParams {
  url?: string
  dataFlag?: boolean // флаг для получения данных или респонса
  headers?: Record<string, string>
  baseUrl?: string
  params?: Record<string, string | number | undefined | string[]>
  defaultErrorMessage?: string
}

export interface DataResponse<T> {
  data: T
  status: 'OK' | 'Not Found' | 'Internal Server Error'
  message: string
}

export const getData = async <T extends {}>
  ({
    baseUrl = process.env.BASE_URL,
    dataFlag,
    url,
    headers = {},
    params = {},
    defaultErrorMessage = "Произошла ошибка при получении данных",
  }: GetDataParams): Promise<T> => {
  const paramsString = generateUrlParams(params)
  const queryParams = paramsString ? '?' + paramsString : '';
  const response = await fetch(`${baseUrl}${url}${queryParams}`, {
    headers,
  })
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message ?? defaultErrorMessage)
  }
  return dataFlag ? data.data : data;
}

export interface sendDataParams<T> {
  baseUrl?: string
  data: T,
  url: string,
  headers?: Record<string, string>
  method?: string
  params?: Record<string, string | number | undefined>
  defaultErrorMessage?: string
  type?: 'FormData' | 'JSON' | "x-www-form-urlencoded"
}

export const sendData = async <DataType extends {}>
  ({
    baseUrl = process.env.BASE_URL,
    data,
    url,
    headers = {},
    method = 'post',
    params = {},
    defaultErrorMessage = "Произошла ошибка при отправке данных",
    type = 'FormData'
  }: sendDataParams<DataType>) => {
  let dataToSend;

  if (type === 'FormData') {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "undefined" || value === null || value === "") return
      if (Array.isArray(value)) {
        formatArrayToFormData(key, value).forEach(({ name: itemKey, value: itemValue, }) => {
          formData.append(itemKey, String(itemValue))
        })
        return
      }
      if (value instanceof Blob){
        formData.append(key, value);
        return;
      }
      formData.append(key, String(value))
    })
    dataToSend = formData;
  }

  if (type === 'JSON') {
    dataToSend = JSON.stringify(data)
  }

  if (type === "x-www-form-urlencoded") {
    const searchParams = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "undefined" || value === null || value === "") return
      if (Array.isArray(value)) {
        formatArrayToFormData(key, value).forEach(({ name: itemKey, value: itemValue, }) => {
          searchParams.append(itemKey, String(itemValue))
        })
        return
      }
      searchParams.append(key, String(value))

      dataToSend = searchParams;
    })
  }

  const queryParams = JSON.stringify(params) === '{}' ? '' : '?' + generateUrlParams(params);
  const response = await fetch(`${baseUrl}${url}${queryParams}`, {
    body: data ? dataToSend : undefined,
    method,
    headers: {
      'Accept': 'application/json',
      ...headers
    }
  })
  const dataJson = await response.json();

  if (!response.ok) {
    throw new Error(dataJson?.message ?? defaultErrorMessage)
  }

  return dataJson;
}