import jwt from "jsonwebtoken";
export function verifyToken(token) {
  try {
    const decodedToken = jwt.decode(token);
    const result = decodedToken?.userInfo;
    return result;
  } catch (error) {
    throw new Error(error);
  }
}
