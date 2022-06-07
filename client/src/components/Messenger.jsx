import React from "react";
import MessagesList from "../components/MessagesList";
import MessageForm from "../components/MessageForm";
import MessagesState from "../store/MessagesState";
import { observer } from "mobx-react-lite";

const Messenger = observer(() => {

    return (
        <div className="d-flex flex-column justify-content-between mb-5" style={{
            width: 800,
            maxWitdh: "100%",
            minHeight: 500,
        }}>
            <MessagesList messages={MessagesState.messages} />
            <MessageForm />
        </div>
    );
});

export default Messenger;