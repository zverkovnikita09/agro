import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

export const Router = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}