import { Schema } from "mongoose";

const NotificationSchema = new Schema({});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
