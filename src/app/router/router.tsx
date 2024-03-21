import { RegistrationPage } from "@pages/RegistrationPage";
import { NotFoundBlock } from "@shared/ui/NotFoundBlock";
import { Route, Routes } from "react-router-dom";

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<></>} />
    <Route path={RouterPaths.LOGIN} element={<RegistrationPage />} />
    <Route path="*" element={<NotFoundBlock title="Страница не найдена"/>} />
  </Routes>
)