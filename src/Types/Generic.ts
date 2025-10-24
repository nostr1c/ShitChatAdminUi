export interface ApiResponse<T> {
  message: string;
  data: T;
  hasErrors: boolean;
  errors: Record<string, any>;
  status: number;
}