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

const determineStatus = (statusCode: number): ApiResponseStatus => {
  if (statusCode >= 400 && statusCode < 500) {
    return ApiResponseStatus.error;
  } else if (statusCode >= 500) {
    return ApiResponseStatus.fail;
  }
  return ApiResponseStatus.success;
};

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
  const status = determineStatus(statusCode);
  const apiResponse = {
    status,
    message,
    data: status === ApiResponseStatus.success ? data : undefined,
    error: status !== ApiResponseStatus.success ? data : undefined,
  } as ApiResponse<T>;

  res.status(statusCode).json(apiResponse);
};
export default sendApiResponse;
