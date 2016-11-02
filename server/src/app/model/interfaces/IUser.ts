import mongoose = require("mongoose");
export interface IUser extends mongoose.Document {
  name: string;
  password: string;
}
