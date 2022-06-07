import React, { useRef, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import Message from "./Message";
import { observer } from "mobx-react-lite";

const MessagesList = observer(({ messages }) => {
    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    return (
        <Accordion ref={messagesRef} className="mb-5" style={{
            maxHeight: 500,
            overflowY: 'auto'
        }}>
            {messages.map((message, index) =>
                <Message key={index} message={message} index={index} />
            )}
        </Accordion>
    );
});

export default MessagesList;