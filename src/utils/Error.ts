import { ErrorRequestHandler, Response } from "express";

class ServerError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ErrorHandler {
  static handleGlobalError: ErrorRequestHandler = (err, req, res, next) => {
    let error = err;
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";

    if (process.env.NODE_ENV === "development") {
      ErrorHandler.sendErrorDev(error, res);
    }

    if (process.env.NODE_ENV === "production") {
      ErrorHandler.sendErrorProd(error, res);
    }
  };

  private static sendErrorDev(error: ServerError, res: Response) {
    return res.status(error.statusCode).json({
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }

  private static sendErrorProd(error: ServerError, res: Response) {
    // Log the error (e.g., to a logging service)

    return res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }
}

export { ServerError, ErrorHandler };
