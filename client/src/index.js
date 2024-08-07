import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import { Store } from './redux/Store';


const root = ReactDOM.createRoot(document.getElementById("root"));

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "https://practo.onrender.com/graphql",
  cache: new InMemoryCache(),
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <ApolloProvider client={client}>
          <App />
          <Toaster />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
