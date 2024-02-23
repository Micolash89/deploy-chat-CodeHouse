import mongoose from "mongoose";

const collection = 'messages';

const schema = new mongoose.Schema({
    username: String,
    text: String
})

const messageModel = mongoose.model(collection, schema);
export default messageModel;