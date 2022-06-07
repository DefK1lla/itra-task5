import { makeAutoObservable } from "mobx";

class CurrentUserState {
    username = "";
    connection = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUsername = (username) => {
        this.username = username;
    };

    setStatus = () => {
        this.connection = !this.connection;
    };
}

export default new CurrentUserState();