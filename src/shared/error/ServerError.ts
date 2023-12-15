export interface ServerError {
    statusCode: number;
    timestamp: Date;
    path: string;
    error: string;
}
