import { FiltersState } from "@entities/Filters/model/Filters.model";
import { NotificationsState } from "@entities/Notifications";
import { UserState } from "@entities/User/model/User.model";
import { SortByState } from "@entities/SortBy/model/SortBy.model";

export interface RootState {
    user: UserState
    notifications: NotificationsState
    filters: FiltersState
    sortBy: SortByState
}