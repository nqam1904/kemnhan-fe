export type Category = {
    id: number | string;
    name: string;
    createDate?: string;
    writeDate?: string;
};

export type CategoryCreateRequest = {
    name: string;
};

export type CategoryUpdateRequest = Partial<CategoryCreateRequest>;

export type CategoryListResponse = Category[];
