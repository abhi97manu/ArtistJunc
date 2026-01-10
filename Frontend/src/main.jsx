import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Provider} from 'react-redux'
import {store} from './Store/store.js'
import "./index.css";

import Layout from "./Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
      <Layout />
    </Provider>
  </StrictMode>
);
