export type Customer = {
    id: string | number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address?: string;
    createDate?: string;
    writeDate?: string;
};

export type CustomerListResponse = Customer[];
