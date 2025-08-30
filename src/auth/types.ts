export type UserType = Record<string, any> | null;

export type AuthState = {
    user: UserType;
    loading: boolean;
};

export type AuthContextValue = {
    user: UserType;
    setState: (updateState: any | Partial<any>) => void;
    loading: boolean;
    authenticated: boolean;
    unauthenticated: boolean;
    checkUserSession?: () => Promise<void>;
};
