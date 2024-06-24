import { Logger, Res } from '@nestjs/common';
import { hash } from 'argon2';
import { Response } from 'express';

export const genPassword = async (data: string) => {
  try {
    return await hash(data);
  } catch (error) {
    Logger.error(error);
  }
};

export const returnObjectFunction = (
  flag: boolean,
  code: number,
  message?: string,
  data?: any,
) => {
  return { success: flag, message: message, result: data, statusCode: code };
};

export const catchError = (error: unknown) => {
  Logger.error(error);
  return returnObjectFunction(false, 500, `Something Went wrong...`);
};

export const fetchResponseFunc = (
  res: Response,
  data: any,
  message?: string,
) => {
  if (data.success) {
    res
      .status(data.statusCode)
      .json({ success: true, message: message, data: data.result });
  } else {
    res
      .status(data.statusCode)
      .json({ success: false, message: message, data: data.result });
  }
};

export const noRecorFound = () => {
  return returnObjectFunction(false, 404, `No record Found...`);
};
