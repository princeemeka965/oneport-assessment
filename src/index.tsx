import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NewQuote from "./NewQuote";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorBoundary from "./ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
  },
  {
    path: "/new-quote",
    element: (
      <ErrorBoundary>
        <NewQuote />
      </ErrorBoundary>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
