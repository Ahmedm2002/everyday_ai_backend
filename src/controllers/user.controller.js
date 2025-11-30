import UserModel from "../models/user.model.js";
import API_RES from "../utils/ApiRes.js";
import validateFields from "../utils/validation.js";
import CONSTANTS from "../constants.js";
import { isValidObjectId } from "mongoose";
import ChatModel from "../models/chat.model.js";

const SERVER_ERR = CONSTANTS.API_ERRORS.SERVER_ERR;
const SERVER_MSG = CONSTANTS.API_ERRORS.SERVER_MSG;
const saltRounds = 10;

async function registerUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const errors = validateFields({ firstName, lastName, email, password });

  if (errors.length > 0) {
    return res
      .status(400)
      .json(
        new API_RES(true, 400, "Please enter all required fields", null, errors)
      );
  }
  try {
    const hashedPassword = bcrypt.hash(password, saltRounds);
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.insertOne({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      return res
        .status(201)
        .json(new API_RES(true, 201, "User Registered Successfully", user));
    }
    return res
      .status(409)
      .json(new API_RES(true, 409, "User already exists, please login", user));
  } catch (error) {
    return res
      .status(500)
      .json(
        new API_RES(false, 500, SERVER_MSG, null, [], [SERVER_ERR], error, req)
      );
  }
}
async function loginUser(req, res) {
  const { password, email } = req.body;

  const errors = validateFields({ email, password });

  if (errors.length > 0) {
    return res
      .status(400)
      .json(
        new API_RES(true, 400, "Please enter all required fields", null, errors)
      );
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json(
          new API_RES(true, 404, "User not found", null, [
            "No user exists. Please register first",
          ])
        );
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json(
          new API_RES(true, 400, "Wrong Password, Try again", null, [
            "Wrong Password",
          ])
        );
    }
    return res
      .status(200)
      .json(new API_RES(true, 200, "Login Successfull", user, null));
  } catch (error) {
    return res
      .status(500)
      .json(
        new API_RES(false, 500, SERVER_MSG, null, [], [SERVER_ERR], error, req)
      );
  }
}
async function allChats(req, res) {
  const { user_id } = req.params.user_id;
  try {
    if (!isValidObjectId(chatId)) {
      res
        .status(400)
        .json(
          new API_RES(true, 400, "Invalid user id", null, ["Invalid user id"])
        );
    }
    const user = await UserModel.findOne({ _id: user_id });
    if (!user) {
      res
        .status(404)
        .json(
          new API_RES(true, 404, "User not found", null, ["No user found"])
        );
    }
    const userChats = await ChatModel.find({ user_id });

    if (!userChats) {
      return res
        .status(404)
        .json(
          new API_RES(true, 404, "No chats found", null, ["No chat exists"])
        );
    }
    res
      .status(200)
      .json(new API_RES(true, 200, "Chats fetcheds sucessfully", userChats));
  } catch (error) {
    return res
      .status(500)
      .json(
        new API_RES(false, 500, SERVER_MSG, null, [], [SERVER_ERR], error, req)
      );
  }
}

export { registerUser, loginUser, allChats };
