import React from "react";
import { Row } from "react-bootstrap";
import UsersList from "../components/UsersList";
import Messenger from "../components/Messenger";

function Main() {
    return (
        <Row className="justify-content-center">
            <Messenger />
            <UsersList />
        </Row>
    );
}

export default Main;