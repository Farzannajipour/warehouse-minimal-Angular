export interface HttpError {
  statusCode: number;
  errorDetails: ErrorDetails;
}

export interface ErrorDetails {
  message: string;
}
