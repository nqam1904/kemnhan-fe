export type Account = {
    id: number | string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
    isActive?: boolean;
    createDate?: string;
    writeDate?: string;
};

export type AccountCreateRequest = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password?: string;
    role: string;
};

export type AccountUpdateRequest = Partial<AccountCreateRequest>;

export type AccountListResponse = Account[];
