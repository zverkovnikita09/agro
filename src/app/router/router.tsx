import { RegistrationPage } from "@pages/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@shared/ui/MainLayout";
import { CheckList } from "@widgets/CheckList";
import { NewApplication } from "@features/NewApplication";
import { NotFoundPage } from "@pages/NotFoundPage";
import { ApplicationPage } from "@pages/ApplicationPage";
import { SelectedApplication } from "@entities/SelectedApplication";
import { LkPage } from "@pages/LkPage";
import { EditProfile } from "@features/EditProfile";
import { ProtectedRoute } from "@providers/ProtectedRoute";
import { Role } from "@entities/User";

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
  CHECKLIST = '/check-list',
  NEW_APPLICATION = '/new-application',
  APPLICATION = '/application',
  PROFILE = '/profile',
  PROFILE_EDIT = '/profile/edit'
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<MainLayout />}>
      <Route index element={<SelectedApplication />} />
      <Route path={`${RouterPaths.PROFILE}/:id`} element={
        <LkPage />
      } />
      <Route path={`${RouterPaths.PROFILE_EDIT}/:id`} element={
        <EditProfile />
      } />
      <Route path={RouterPaths.CHECKLIST} element={<CheckList />} />
      <Route path={RouterPaths.NEW_APPLICATION} element={
        <ProtectedRoute targetRole={Role.CLIENT}>
          <NewApplication />
        </ProtectedRoute>
      } />
      <Route path={`${RouterPaths.APPLICATION}/:id`} element={<ApplicationPage />} />
    </Route>
    <Route path={RouterPaths.LOGIN} element={<RegistrationPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)