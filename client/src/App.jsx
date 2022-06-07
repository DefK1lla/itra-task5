import React from "react";
import { Container } from "react-bootstrap";
import Main from "./pages/Main";
import Login from "./pages/Login";
import CurrentUserState from "./store/CurrentUserState";
import { observer } from "mobx-react-lite";
import "bootstrap/dist/css/bootstrap.min.css";

const App = observer(() => {
  return (
    <Container className="p-5">
      {CurrentUserState.connection && <Main />}
      {CurrentUserState.connection === false && <Login />}
    </Container>
  );
});

export default App;
