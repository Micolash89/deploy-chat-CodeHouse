import messageModel from "../models/message.js";

export default class Message {


    getMessages = async () => {
        try {
            const messages = await messageModel.find().lean();
            return messages;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    saveMessage = async (message) => {
        try {
            const result = await messageModel.create(message);
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    deleteMessages = async () => {
        try {
            const result = await messageModel.deleteMany({});
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}
