<<<<<<< HEAD
import { RegistrationPage } from "@pages/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@shared/ui/MainLayout";
import { CheckList } from "@widgets/CheckList";
import { NewApplication } from "@features/NewApplication";
import { NotFoundPage } from "@pages/NotFoundPage";
=======
import {RegistrationPage} from "@pages/RegistrationPage";
import {NotFoundBlock} from "@shared/ui/NotFoundBlock";
import {Route, Routes} from "react-router-dom";
import {MainLayout} from "@shared/ui/MainLayout";
import {CheckList} from "@widgets/CheckList";
import {ApplicationPage} from "@pages/ApplicationPage";
>>>>>>> 3f9e561858e625f73cc29cc275c9bf1078537bdd

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
  CHECKLIST = '/check-list',
<<<<<<< HEAD
  NEW_APPLICATION = '/new-application'
=======
  APPLICATION = '/application',
>>>>>>> 3f9e561858e625f73cc29cc275c9bf1078537bdd
}

export const Router = () => (
  <Routes>
    <Route path={RouterPaths.MAIN} element={<MainLayout />}>
<<<<<<< HEAD
      <Route path={RouterPaths.CHECKLIST} element={<CheckList />} />
      <Route path={RouterPaths.NEW_APPLICATION} element={<NewApplication />} />
=======
      <Route path={RouterPaths.CHECKLIST} element={<CheckList />}/>
      <Route path={`${RouterPaths.APPLICATION}/:id`} element={<ApplicationPage />}/>
>>>>>>> 3f9e561858e625f73cc29cc275c9bf1078537bdd
    </Route>
    <Route path={RouterPaths.LOGIN} element={<RegistrationPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)