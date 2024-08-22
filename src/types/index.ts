enum GlobalResponseStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export type GlobalResponse<T> = {
  data: T | null;
  error: ErrorResponse | null;
  status: GlobalResponseStatus;
};

export type ErrorResponse = {
  errorMessage: string;
  errorCode: number;
};
