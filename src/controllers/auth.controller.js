import API_RES from "../utils/ApiRes.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const SERVER_ERR = "Internal Server Error";
const SERVER_MSG = "Something went wrong";

async function verfiyJwt(req, res) {
    const token = req.body.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json(new API_RES(false, 401, "No token provided", null));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId).select("-password, -originalPassword");

        if (!user) {
            return res
                .status(404)
                .json(new API_RES(false, 404, "User not found", null));
        }

        return res
            .status(200)
            .json(new API_RES(true, 200, "Token verified successfully", user));
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json(new API_RES(false, 401, "Token expired", null));
        }
        return res
            .status(401)
            .json(new API_RES(false, 401, "Invalid token", null, [], [], error));
    }
}
export default verfiyJwt;
