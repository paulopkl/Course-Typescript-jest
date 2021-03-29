import { MessagingProtocol } from "../class/interfaces/Messaging_Protocol";

export class Messaging implements MessagingProtocol {
    sendMessage(msg: string) {
        console.log("Message sent:", msg);
    };
}