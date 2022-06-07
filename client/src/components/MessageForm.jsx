import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import FormState from "../store/FormState";
import UsersState from "../store/UsersState";
import MessagesState from "../store/MessagesState";
import Socket from "../socket/Socket";
import { observer } from "mobx-react-lite";

const MessageForm = observer(() => {
    const [suggestions, setSuggestions] = useState([]);

    function suggestionHandler(receiver) {
        FormState.setReceiver(receiver);
        setSuggestions([]);
    }

    function changeHandler(e) {
        let matches;

        FormState.setReceiver(e.target.value);

        if (FormState.receiver.length > 0) {
            matches = UsersState.users.filter(user => {
                return user.toLowerCase().indexOf(FormState.receiver) === 0;
            });
        }

        setSuggestions(matches);
    }

    function clickHandler(e) {
        const message = {
            messageType: "sent",
            receiver: FormState.receiver,
            topic: FormState.topic,
            text: FormState.message,
            timeStamp: new Date().getTime(),
        };

        MessagesState.updateMessages(message);
        Socket.sendMessage();

        FormState.setReceiver("");
        FormState.setTopic("");
        FormState.setMessage("");
    }

    return (
        <div>
            <InputGroup className="mb-3" style={{
                position: "relative",
            }}>
                <Form.Label>Receiver</Form.Label>
                <FormControl className="w-100"
                    onChange={changeHandler}
                    value={FormState.receiver}
                    aria-label="Receiver"
                    aria-describedby="user"
                />
                {suggestions &&
                    <div style={{
                        width: "100%",
                        position: "absolute",
                        top: 75,
                        zIndex: 999,
                        background: "white",
                        borderLeft: "1px solid #DFDFDF",
                        borderRight: "1px solid #DFDFDF",
                    }}>
                        {suggestions.map((suggestion, index) =>
                            <div style={{
                                cursor: "pointer",
                                borderBottom: "1px solid #DFDFDF",
                                padding: 3
                            }}
                                onClick={() => suggestionHandler(suggestion)}
                                key={index}>
                                {suggestion}
                            </div>)}
                    </div>}
            </InputGroup >

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-Topic">Topic</InputGroup.Text>
                <FormControl
                    onChange={(e) => FormState.setTopic(e.target.value)}
                    value={FormState.topic}
                    aria-label="Topic"
                    aria-describedby="inputGroup-sizing-Topic"
                />
            </InputGroup>

            <Form.Group className="mb-3" controlId="message">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                    onChange={(e) => FormState.setMessage(e.target.value)}
                    value={FormState.message}
                    as="textarea"
                    rows={3} />
            </Form.Group>

            <Button onClick={clickHandler} variant="primary" type="button">
                Send
            </Button>
        </div >
    );
});

export default MessageForm;