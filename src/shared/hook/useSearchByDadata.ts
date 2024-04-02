import { useEffect, useState } from "react"
import { useSendData } from "./useSendData"
import { useDebounce } from "./useDebounce"

interface useSearchByDadataProps {
  query: string //запрос
  target: 'address' | 'party' //address - поиск адреса по строке, party - поиск компании по инн или названию
  queryParams?: Record<string, string>
  debuonceTime?: number
  minQueryLength?: number
}

export const useSearchByDadata = <T extends {}>({ query, target, queryParams, debuonceTime = 300, minQueryLength = 1 }: useSearchByDadataProps) => {
  const { handleSendData, isError, isSuccess, responseData } = useSendData(
    {
      url: `http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${target}`,
      baseUrl: "",
      headers: {
        Authorization: `Token ${process.env.DADATA_TOKEN}}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      type: "JSON",
    })

  const debouncedQuery = useDebounce(() => handleSendData({ query, ...queryParams }), debuonceTime)

  useEffect(() => {
    if (query && query.length >= minQueryLength) {
      debouncedQuery();
    }
  }, [query])

  return { data: responseData as T, isError, isSuccess } as const;
}