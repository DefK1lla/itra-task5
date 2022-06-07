const express = require("express");
const mongoose = require('mongoose');
const User = require("./models/User");
const app = express();
const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();

const PORT = process.env.PORT || 5000;
const DB_URL = "mongodb+srv://user:user@cluster0.v7mea.mongodb.net/?retryWrites=true&w=majority";

app.ws('/', (ws, req) => {
    ws.on("message", async (msg) => {
        const message = JSON.parse(msg);

        switch (message.event) {
            case "connection":
                const usersData = await User.find();
                const users = [];

                for (let user of usersData) {
                    users.push(user.username);
                }

                const visitor = await User.findOne({ username: message.username });
                ws.username = message.username;

                if (visitor === null) {
                    const newUser = new User({ username: message.username, messages: [] });
                    await newUser.save();

                    const answer = {
                        event: "connection",
                        users,
                    }

                    ws.send(JSON.stringify(answer));

                    const notification = {
                        event: "newUser",
                        newUser
                    };

                    for (let client of aWss.clients) {
                        client.send(JSON.stringify(notification));
                    }
                    return;
                }

                const messages = visitor.messages;

                const answer = {
                    event: 'connection',
                    users,
                    messages
                };

                ws.send(JSON.stringify(answer));
                break;

            case "newMessage":
                const sender = await User.findOne({ username: ws.username });
                sender.messages.push(message.message);
                await sender.save();

                const receiver = await User.findOne({ username: message.message.receiver });

                delete message.message.receiver;


                if (receiver) {
                    message.message.isChecked = false;
                    message.message.sender = ws.username;
                    message.message.messageType = "received";

                    receiver.messages.push(message.message);
                    receiver.save();

                    for (let client of aWss.clients) {
                        if (client.username === receiver.username) {
                            const newMessage = {
                                event: "newMessage",
                                message: message.message
                            };

                            client.send(JSON.stringify(newMessage));
                        }
                    }
                }


                break;
            case "check":
                const user = await User.findOne({ username: ws.username });
                user.messages[message.index].isChecked = true;
                user.markModified("messages");
                await user.save();
                break;
        }
    });
});

const start = async () => {
    await mongoose.connect(DB_URL);

    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
};

start();

