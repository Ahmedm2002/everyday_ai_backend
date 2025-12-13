import jwt from "jsonwebtoken";

async function verifyJwtToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export default verifyJwtToken;
