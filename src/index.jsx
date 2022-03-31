import React from "react";
import ReactDOM from "react-dom";
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Container } from "react-bootstrap";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";
import MainView from "./components/main-view/main-view";
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class BetamaxApplication extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(BetamaxApplication), container);
