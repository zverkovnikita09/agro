import { Nullable } from "@shared/lib/globalTypes";

export enum ModerationStatuses {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface MainOrganisationInfo {
  type?: "ИП" | "ООО"
  inn: number
  ogrn: string
  okved: string
  region: string
  accountant_phone: string
  director_name: string
  director_surname: string
  short_name: string
  full_name: string
  juridical_address: string
  office_address: string
  tax_system: string
}

export interface PersonalData {
  series: number
  number: number
  name: string
  surname: string
  patronymic: string
  department: string
  snils: string
  issue_date_at: string
  department_code: string
  email: string
  gender: string
  bdate: string
  moderation_status: ModerationStatuses
}

export type UserInfo = MainOrganisationInfo & PersonalData

export interface UserFiles {
  type: string
  id: string
  path_url: string
}
export interface User extends UserInfo {
  id: string
  phone_number: string,
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