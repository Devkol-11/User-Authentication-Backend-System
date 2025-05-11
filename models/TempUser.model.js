import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username : {type : string , required : true},
  password: { type: String, required: true },
  code: { type: String, required: true },
  codeExpiresAt: { type: Date, required: true },
});

const TempUser = mongoose.model("TempUser", tempUserSchema);
export default TempUser;
