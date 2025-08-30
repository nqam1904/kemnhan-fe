export type Setting = {
    id: number | string;
    key?: string;
    value: string;
    createDate?: string;
    writeDate?: string;
};

export type SettingListResponse = Setting[];

export type SettingUpdateRequest = Partial<Pick<Setting, 'value'>>;
