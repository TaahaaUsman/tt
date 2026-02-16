import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const createToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: "30d" });
};

export const verifyToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("Error while verifying Token", error);
    return null;
  }
};
