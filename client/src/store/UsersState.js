import { makeAutoObservable } from "mobx";

class UsersState {
    users = [];

    constructor() {
        makeAutoObservable(this);
    }

    setUsers = (users) => {
        this.users = users;
    };

    updateUsers = (user) => {
        this.users.push(user);
    };
}

export default new UsersState();