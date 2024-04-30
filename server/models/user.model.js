import { Schema } from "mongoose";

const UserSchema = new Schema({});

const User = mongoose.model("User", UserSchema);

export default User;
