import { Response } from "express";

const ApiResponseStatus = {
  success: "success",
  error: "error",
  fail: "fail",
} as const;

type ApiResponseStatus =
  (typeof ApiResponseStatus)[keyof typeof ApiResponseStatus];

interface ApiResponse<T> {
  status: ApiResponseStatus;
  message?: string;
  data?: T;
  error?: T;
}
/**
 * Sends API response
 *
 * @param res Express Response object
 * @param statusCode HTTP status code
 * @param message Message to send
 * @param(optional) data to send
 * @param(optional) error to send
 * @summary should contain either data or error.
 * @returns void
 */
const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  const apiResponse = {
    message,
  } as ApiResponse<T>;
  // Set proper status
  apiResponse.status = ApiResponseStatus.success;
  if (statusCode >= 400 && statusCode < 500) {
    apiResponse.status = ApiResponseStatus.error;
  } else if (statusCode >= 500) {
    apiResponse.status = ApiResponseStatus.fail;
  }
  // Set data
  if (apiResponse.status === ApiResponseStatus.success) {
    apiResponse.data = data;
  } else {
    apiResponse.error = data;
  }

  return res.status(statusCode).json(apiResponse);
};
export default sendApiResponse;
