import React from "react";
import { Form, Button } from "react-bootstrap";
import CurrentUserState from "../store/CurrentUserState";
import Socket from "../socket/Socket";
import { observer } from "mobx-react-lite";

const Login = observer(() => {
    function clickHandler() {
        Socket.open();
    }

    return (
        <div className="d-flex align-items-end">
            <Form.Group controlId="username">
                <Form.Label className="m-2">Choose a username</Form.Label>
                <Form.Control className="w-100" style={{
                    maxWidth: 320
                }}
                    value={CurrentUserState.username}
                    onChange={e => CurrentUserState.setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter username" />
            </Form.Group>

            <Button
                onClick={clickHandler}
                variant="primary"
                type="button">
                Join
            </Button>
        </div>
    );
});

export default Login;