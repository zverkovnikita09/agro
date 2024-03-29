import './styles/global.scss';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from '@providers/ErrorsBoundary';

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback="">
        <Provider store={store}>
          <Router />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}