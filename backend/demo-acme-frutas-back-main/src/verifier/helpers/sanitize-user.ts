import { VerifyDto } from "../dtos/verify.dto";
import { Verify } from "../entities";

export const sanitizeVerify = (user: Verify): VerifyDto => {
  const { email, ...sanitizedUser } = user;
  return sanitizedUser;
};
