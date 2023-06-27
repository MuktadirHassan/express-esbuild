import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ErrorHandler {
  static handleGlobalError(
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal server error";

    if (process.env.NODE_ENV === "development") {
      ErrorHandler.sendErrorDev(error, res);
    } else {
      ErrorHandler.sendErrorProd(error, res);
    }
  }

  private static sendErrorDev(error: AppError, res: Response) {
    res.status(error.statusCode).json({
      status: error.status,
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }

  private static sendErrorProd(error: AppError, res: Response) {
    // Log the error (e.g., to a logging service)

    res.status(error.statusCode).json({
      status: error.status,
      error: {
        message: error.message,
      },
    });
  }
}

export { AppError, ErrorHandler };
