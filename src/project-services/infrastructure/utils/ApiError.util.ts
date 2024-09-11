import { ErrorCode, StatusCodes } from '../../core/domain';

export class ApiError extends Error {
  public errorCode: ErrorCode;
  public errorDetails?: unknown;
  public statusCode = 500;

  constructor(message: string, errorCode: ErrorCode, statusCode = 500, errorDetails?: unknown) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    if (errorDetails) {
      this.errorDetails = errorDetails;
    }
  }
}

interface IOptions {
  id?: string;
  code?: string;
  body?: unknown;
}
export class BadRequestError extends ApiError {
  constructor(message: string, options?: IOptions) {
    const code = <ErrorCode>options?.code ?? ErrorCode.BAD_REQUEST;
    super(message, code, StatusCodes.BadRequest, {
      id: options?.id,
      code,
      message,
      body: options?.body
    });
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string, options?: IOptions) {
    const code = <ErrorCode>options?.code ?? ErrorCode.INTERNAL_SERVER_ERROR;
    super(message, code, StatusCodes.InternalServerError, {
      message,
      code,
      id: options?.id,
      body: options?.body
    });
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, options?: IOptions) {
    const code = <ErrorCode>options?.code ?? ErrorCode.NOT_FOUND;
    super(message, code, StatusCodes.NotFound, {
      message,
      code,
      id: options?.id,
      body: options?.body
    });
  }
}
