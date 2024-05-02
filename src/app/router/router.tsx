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

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
  CHECKLIST = '/check-list',
  NEW_APPLICATION = '/new-application',
  APPLICATION = '/application',
  LK = '/lk',
  LK_EDIT = '/lk/edit'
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<MainLayout />}>
      <Route index element={<SelectedApplication />} />
      <Route path={RouterPaths.LK} element={<LkPage />} />
      <Route path={RouterPaths.LK_EDIT} element={<EditProfile />} />
      <Route path={RouterPaths.CHECKLIST} element={<CheckList />} />
      <Route path={RouterPaths.NEW_APPLICATION} element={<NewApplication />} />
      <Route path={`${RouterPaths.APPLICATION}/:id`} element={<ApplicationPage />} />
    </Route>
    <Route path={RouterPaths.LOGIN} element={<RegistrationPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)