import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// @TODO: Uncomment each module as needed in your client app
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
// import { Provider as ReduxProvider } from 'react-redux'
// -------------------------------
import ItemPreviewProvider from "./context/ItemPreviewProvider";
import registerServiceWorker from "./registerServiceWorker";
import theme from "./theme";
import client from "./apollo";
import AppRoutes from "./routes";

/**
 * @TODO: Initialize Redux Store
 *
 * Uncomment the following line when your Redux store is configured
 *
 * import store from './redux'
 *
 * Below in your <App />, wrap a <ReduxProvider /> component around all
 * of the app's children, and pass it the imported `store` as the `store`
 * prop's value.
 */

import { ViewerProvider } from "./context/ViewerProvider";

import "./index.scss";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ItemPreviewProvider>
        <BrowserRouter>
          <ViewerProvider>
            <MuiThemeProvider theme={theme}>
              <AppRoutes>
                <CssBaseline />
              </AppRoutes>
            </MuiThemeProvider>
          </ViewerProvider>
        </BrowserRouter>
      </ItemPreviewProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
