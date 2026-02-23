import jwt from "jsonwebtoken";
export function ValidateTokenService(token) {
  const validateToken = jwt.verify(token, process.env.TOKEN_KEY);
  return validateToken;
}
