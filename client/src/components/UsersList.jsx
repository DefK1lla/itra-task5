import React from "react";
import UsersState from "../store/UsersState";
import { ListGroup } from "react-bootstrap";
import FormState from "../store/FormState";
import { observer } from "mobx-react-lite";

const UsersList = observer(() => {
    return (
        <ListGroup style={{
            maxHeight: 500,
            overflowY: 'auto',
            maxWidth: 300,
            width: "100%"
        }}>

            {UsersState.users.map((user, index) =>
                <ListGroup.Item
                    key={index}
                >
                    {user}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default UsersList;