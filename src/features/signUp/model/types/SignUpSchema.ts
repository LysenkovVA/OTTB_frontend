export interface SignUpSchema {
    email: string;
    password: string;
    repeatedPassword: string;
    isLoading: boolean;
    error: string | undefined;
}
