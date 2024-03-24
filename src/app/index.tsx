import './styles/global.scss';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Provider } from 'react-redux';
import { store } from './store';

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  )
}