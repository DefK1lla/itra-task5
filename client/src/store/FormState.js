import { makeAutoObservable } from "mobx";

class FormState {
    receiver = "";
    topic = "";
    message = "";

    constructor() {
        makeAutoObservable(this);
    }

    setReceiver = (receiver) => {
        this.receiver = receiver;
    };

    setTopic = (topic) => {
        this.topic = topic;
    };

    setMessage = (message) => {
        this.message = message;
    };
}

export default new FormState();