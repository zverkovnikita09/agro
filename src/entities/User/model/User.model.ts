import { Nullable } from "@shared/lib/globalTypes";

export interface MainOrganisationInfo {
  inn: number
  ogrn: number
  name: string
  okved: number
}

export interface PersonalData {
  series: number
  number: number
  department: string
  snils: string
  issue_date_at: string
  //documents
  juridical_address: string
  office_address: string
  tax_system: string
  department_code: string
  type?: "ИП" | "ООО"
}

export type UserInfo = MainOrganisationInfo & PersonalData
export interface User {
  id: string
  phone_number: string,
  userinfo?: UserInfo
  roles?: [
    { slug: Role }
  ]
}

export interface UserState {
  token?: Nullable<string>
  user?: Nullable<User>
  isUserDataLoading: boolean
  isUserDataError: boolean
}

export enum Role {
  CLIENT = "client",
  LOGIST = "logistician"
}