export type PromotionImage = {
    key: string;
    url?: string;
};

export type Promotion = {
    id: number | string;
    name: string;
    content?: string;
    endDate?: string;
    isActive?: boolean;
    slug?: string;
    images?: PromotionImage[];
    createDate?: string;
    writeDate?: string;
};

export type PromotionCreateRequest = {
    name: string;
    content?: string;
    endDate?: string;
    isActive?: boolean;
    slug?: string;
    images?: File[];
};

export type PromotionUpdateRequest = Partial<PromotionCreateRequest>;

export type PromotionListResponse = Promotion[];
