import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ThemeProvider,
  CategoryProvider,
  AuthProvider,
  VideosProvider,
  UserDataProvider,
} from "contexts";
import App from "./App";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CategoryProvider>
            <VideosProvider>
              <UserDataProvider>
                <App />
              </UserDataProvider>
            </VideosProvider>
          </CategoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
