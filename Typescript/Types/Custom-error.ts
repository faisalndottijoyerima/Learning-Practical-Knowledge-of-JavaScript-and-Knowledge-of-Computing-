// ============================================================
// 2. Custom Error Types
// ============================================================
 
export class ApiError extends Error {
  public statusCode: number;
  public details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}
 
export class NotFoundError extends ApiError {
  constructor(id: number) {
    super(404, `Todo with id ${id} not found`);
    this.name = "NotFoundError";
  }
}
 
export class NetworkError extends ApiError {
  constructor(message: string) {
    super(0, `Network error: ${message}`);
    this.name = "NetworkError";
  }
}
 
console.log("Custom error types defined successfully.");    