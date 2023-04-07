import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './components/Hooks/useHook';
const rootElement = document.getElementById("root");


//ReactDOM.render(<App />,document.getElementById('root'));
ReactDOM.render(
  <StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
