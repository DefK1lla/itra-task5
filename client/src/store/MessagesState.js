import { makeAutoObservable } from "mobx";

class MessagesState {
    messages = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMessages = (messages) => {
        this.messages = messages;
    }

    updateMessages = (message) => {
        this.messages.push(message);
    }

    setStatus = (index) => {
        this.messages[index].isChecked = true;
    }
}

export default new MessagesState();