import { RegistrationPage } from "@pages/RegistrationPage";
import { Route, Routes } from "react-router-dom";

export enum RouterPaths {
  MAIN = '/',
  REGISTRATION = '/registration',
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<></>} />
    <Route path={RouterPaths.REGISTRATION} element={<RegistrationPage />} />
  </Routes>
)