import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import 'boxicons';
import App from "./App";
import {ChartProvider} from "views/admin/default/context/chartContext"
import { AuthContextProvider } from "views/auth/context/AuthContext";
import { EventsContextProvider } from "views/admin/events-manage/context/eventContext";
import { FrameProvider } from "views/admin/tables/context/frameContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
  <EventsContextProvider>
  <ChartProvider>
  <FrameProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </FrameProvider>
  </ChartProvider>
  </EventsContextProvider>
  </AuthContextProvider>
);
