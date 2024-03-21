import './styles/global.scss';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

export const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}