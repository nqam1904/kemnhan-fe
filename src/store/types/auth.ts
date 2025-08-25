export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    is_success: boolean;
    access_token: string;
    user: {
        firstName: string;
        lastName: string;
        isActive: boolean;
        phone: string;
        email: string;
        role: string;
        id: number;
        createDate: string;
        writeDate: string;
    };
}
