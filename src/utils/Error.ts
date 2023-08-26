import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger";
import { isDev } from "../config/constants";
import sendApiResponse from "./sendApiResponse";

class ServerError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public status: "error" | "fail";

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = statusCode >= 400 && statusCode < 500 ? "error" : "fail";

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleGlobalError: ErrorRequestHandler = (error, req, res, next) => {
  let err = error;

  // Central Error Handling
  switch (true) {
    // Operational errors
    case err instanceof ServerError:
      break;

    // Zod errors
    case err instanceof ZodError:
      const zodError = err as ZodError;
      const errMsg = zodError.issues
        .map((issue) => `${issue.path.join(".")} ${issue.message}`)
        .join(", ");
      err = new ServerError(400, errMsg);
      break;

    // Not Operational errors
    default:
      // The optional values are for development only, as they are not
      // needed in production.
      // Production error will be either isOperational or not.
      err.statusCode = err.statusCode || 500;
      err.status = err.status || "fail";
      err.message = err.message;
      err.isOperational = false;
      break;
  }

  err.isOperational ? logger.error(err) : logger.fatal(err);

  if (isDev) {
    handleDevErrorResponse(err, res);
  } else {
    handleProdErrorResponse(err, res);
  }
};

const handleDevErrorResponse = (err: ServerError, res: Response) => {
  return sendApiResponse(res, err.statusCode, err.message, err.stack);
};

const handleProdErrorResponse = (err: ServerError, res: Response) => {
  // Operational handled errors
  if (err.isOperational) {
    return sendApiResponse(res, err.statusCode, err.message);
  }

  // Not Operational errors
  return sendApiResponse(res, 500, "Internal Server Error");
};

export { ServerError, handleGlobalError };
