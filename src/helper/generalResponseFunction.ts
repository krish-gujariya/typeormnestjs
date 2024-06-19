import { Response } from 'express';
export const generalResponse = (
  res: Response,
  statusCode: number,
  flag: boolean,
  message?: string,
  data?: any,
) => {
  return res
    .status(statusCode)
    .json({ success: flag, message: message, data: data });
};
