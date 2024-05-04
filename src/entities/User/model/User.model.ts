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
  issue_date: string
  department: string
  snils: string
  issue_date_at: number
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
  userInfo?: UserInfo
  roles?: [
    { slug: Role }
  ]
}

export interface UserState {
  token?: Nullable<string>;
  user?: Nullable<User>
}

export enum Role {
  CLIENT = "client",
  LOGIST = "logistician"
}