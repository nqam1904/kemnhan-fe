export type PromotionImage = {
    key: string;
    url?: string;
};

export type Promotion = {
    id: number | string;
    name: string;
    content?: string;
    isActive?: boolean;
    slug?: string;
    endDate?: string; // ISO string from server
    images?: PromotionImage[];
    createDate?: string;
    writeDate?: string;
};

export type PromotionCreateRequest = {
    name: string;
    slug: string;
    content: string;
    endDate: string; // send ISO string
    images: File[];
    isActive: boolean;
};

export type PromotionUpdateRequest = Partial<PromotionCreateRequest>;

export type PromotionListResponse = Promotion[];
