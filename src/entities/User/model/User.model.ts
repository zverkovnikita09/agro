import { Nullable } from "@shared/lib/globalTypes";

export interface UserState {
  token?: Nullable<string>;
  user?: Nullable<Record<string, string>>
}

