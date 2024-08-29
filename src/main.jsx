import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import Modal from "react-modal";
import "./index.css";
import ThemeProvider from "./seller/utils/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

// Set the app element for react-modal
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>
);
