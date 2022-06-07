import React from "react";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import MessagesState from "../store/MessagesState";
import Socket from "../socket/Socket";

const Message = observer(({ message, index }) => {
    const decoratedOnClick = useAccordionButton(index, () => {
        MessagesState.setStatus(index);
        Socket.checkMessage(index);
    });


    return (
        <div>
            <Accordion.Item eventKey={index}>
                <Accordion.Header onClick={decoratedOnClick}>
                    <div className="w-100 d-flex flex-column flex-lg-row justify-content-between align-items-center">
                        <div className="text-nowrap p-1">
                            <b>
                                {message.messageType === 'received' ? 'Sender: ' : 'Receiver: '}
                            </b>

                            {message.receiver ? message.receiver : message.sender}
                        </div>
                        <div className="w-100 text-center mb-1">
                            {message.isChecked === false
                                ? <b>{message.topic}</b>
                                : message.topic
                            }
                        </div>
                        <div className="text-center">
                            {new Date(message.timeStamp).toLocaleString()}
                        </div>
                    </div>
                </Accordion.Header>

                <Accordion.Body>
                    {message.text}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
});

export default Message;