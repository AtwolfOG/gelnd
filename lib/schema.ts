import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    isverified: {
      type: Boolean,
      default: false,
      required: true,
    },
    verificationtoken: {
      type: String,
    },
    verificationtokenexp: {
      type: String,
    },
    passwordresettoken: {
      type: String,
    },
    passworderesettokenexp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);
export default User;
