import jwt from "jsonwebtoken";

async function createJwtToken(userId, email) {
  const payload = {
    userId,
    email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
    issuer: "chat-app",
  });

  return token;
}

export default createJwtToken;
