import {RegistrationPage} from "@pages/RegistrationPage";
import {NotFoundBlock} from "@shared/ui/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@shared/ui/MainLayout";
import {CheckList} from "@widgets/CheckList";
import {ApplicationPage} from "@pages/ApplicationPage";

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
  CHECKLIST = '/check-list',
  APPLICATION = '/application',
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<MainLayout />}>
      <Route path={RouterPaths.CHECKLIST} element={<CheckList />}/>
      <Route path={`${RouterPaths.APPLICATION}/:id`} element={<ApplicationPage />}/>
    </Route>
    <Route path={RouterPaths.LOGIN} element={<RegistrationPage/>}/>
    <Route path="*" element={<NotFoundBlock title="Страница не найдена"/>}/>
  </Routes>
)