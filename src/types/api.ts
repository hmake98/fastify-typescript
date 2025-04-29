export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: string;
  statusCode: number;
  validation?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationQuery {
  limit?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
}
