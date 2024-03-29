import { RegistrationPage } from "@pages/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@shared/ui/MainLayout";
import { CheckList } from "@widgets/CheckList";
import { NewApplication } from "@features/NewApplication";
import { NotFoundPage } from "@pages/NotFoundPage";

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
  CHECKLIST = '/check-list',
  NEW_APPLICATION = '/new-application'
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<MainLayout />}>
      <Route path={RouterPaths.CHECKLIST} element={<CheckList />} />
      <Route path={RouterPaths.NEW_APPLICATION} element={<NewApplication />} />
    </Route>
    <Route path={RouterPaths.LOGIN} element={<RegistrationPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)