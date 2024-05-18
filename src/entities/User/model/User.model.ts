import { Nullable } from "@shared/lib/globalTypes";

export interface MainOrganisationInfo {
  inn: number
  ogrn: string
  name: string
  okved: string
}

export interface PersonalData {
  series: number
  number: number
  department: string
  snils: string
  issue_date_at: string
  juridical_address: string
  office_address: string
  tax_system: string
  department_code: string
  type?: "ИП" | "ООО"
}

export type UserInfo = MainOrganisationInfo & PersonalData

export interface UserFiles {
  fileType: {
    title: string
    id: string
  }
  id: string,
  path_url: string
}
export interface User {
  id: string
  phone_number: string,
  userinfo?: UserInfo
  files?: UserFiles[]
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