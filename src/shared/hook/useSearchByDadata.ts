import { useEffect, useState } from "react"
import { useSendData } from "./useSendData"
import { useDebounce } from "./useDebounce"

interface useSearchByDadataProps<T> {
  query: string //запрос
  target: 'address' | 'party' //address - поиск адреса по строке, party - поиск компании по инн или названию
  queryParams?: Record<string, string>
  debounceTime?: number
  minQueryLength?: number
  onSuccess?: (data: T) => void
}

export const useSearchByDadata = <T extends {}>({ query, target, queryParams, debounceTime = 300, minQueryLength = 1, onSuccess }: useSearchByDadataProps<T>) => {
  const { handleSendData, isError, isSuccess, responseData, isSending } = useSendData(
    {
      url: `http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${target}`,
      baseUrl: "",
      headers: {
        Authorization: `Token ${process.env.DADATA_TOKEN}}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      type: "JSON",
      onSuccess
    })

  const debouncedQuery = useDebounce(() => handleSendData({ query, ...queryParams }), debounceTime)

  useEffect(() => {
    if (query && query.length >= minQueryLength) {
      debouncedQuery();
    }
  }, [query])

  return { data: responseData as T, isError, isSuccess, isSending } as const;
}