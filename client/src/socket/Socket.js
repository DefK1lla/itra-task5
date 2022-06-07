import CurrentUserState from "../store/CurrentUserState";
import UsersState from "../store/UsersState";
import FormState from "../store/FormState";
import MessagesState from "../store/MessagesState";

class Socket {
    socket;

    open = () => {
        this.socket = new WebSocket("ws:fathomless-beyond-26880.herokuapp.com");

        this.socket.onopen = () => {
            CurrentUserState.setStatus();
            const message = JSON.stringify({
                event: "connection",
                username: CurrentUserState.username,
            });
            this.socket.send(message);
        };

        this.socket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            switch (data.event) {
                case "connection":
                    UsersState.setUsers(data.users);
                    if (data.messages) MessagesState.setMessages(data.messages);
                    break;
                case "newMessage":
                    MessagesState.updateMessages(data.message);
                    console.log(data.message)
                    break;
                case "newUser":
                    UsersState.updateUsers(data.newUser.username);
                    break;
                default:
                    return;
            }
        };

        this.socket.onclose = (e) => {
            CurrentUserState.setStatus();
        };
    };

    sendMessage = () => {
        const message = {
            event: "newMessage",
            message: {
                receiver: FormState.receiver,
                topic: FormState.topic,
                timeStamp: new Date().getTime(),
                text: FormState.message
            }
        }

        this.socket.send(JSON.stringify(message));
    };

    checkMessage = (index) => {
        const message = {
            event: "check",
            index
        }

        this.socket.send(JSON.stringify(message));
    };
}

export default new Socket();




