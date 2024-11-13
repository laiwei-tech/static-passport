export type BaseErrorOptions = {
  cause?: Error;
  data?: Record<string, unknown>;
  expose?: boolean;
};

export class BaseError extends Error {
  cause?: Error;
  data?: Record<string, unknown>;
  expose: boolean;

  constructor(message: string, options: BaseErrorOptions = {}) {
    super(message);
    this.cause = options.cause;
    this.data = options.data;
    this.expose = options.expose ?? true;
  }

  printTraceStack(): void {
    for (
      let error = this.cause;
      error != null;
      error = error instanceof BaseError ? error.cause : undefined
    ) {
      console.error("Caused by:", error);
    }
  }
}

export class BackendError extends BaseError {}

export class BadRequestError extends BackendError {
  constructor(message = "Bad request.", options: BaseErrorOptions = {}) {
    super(message, options);
  }
}

export class InternalServiceError extends BackendError {
  constructor(
    message = "Internal service error.",
    options: BaseErrorOptions = {}
  ) {
    super(message, options);
  }
}

export class NetworkError extends BackendError {
  constructor(message = "Network error.", options: BaseErrorOptions = {}) {
    super(message, options);
  }
}
