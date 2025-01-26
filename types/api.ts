export interface ChatResponse {
  response: string
}

export interface ProcessResumeResponse {
  message: string
}

export interface ErrorResponse {
  error: string
}

export type StatusCounts = Record<number, number>; 