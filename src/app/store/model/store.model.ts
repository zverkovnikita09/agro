import { NotificationsState } from "@entities/Notifications";
import { UserState } from "@entities/User/model/User.model";

export interface RootState {
    user: UserState
    notifications: NotificationsState
}