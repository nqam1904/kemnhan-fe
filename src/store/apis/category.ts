import { endpoints } from '@/utils/axios';
import { RTKQueryApi } from '../create-api';
import type {
    Category,
    CategoryCreateRequest,
    CategoryListResponse,
    CategoryUpdateRequest,
} from '../types/category';

export const categoryApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryListResponse, void>({
            query: () => ({
                url: endpoints.dashboard.categories,
                method: 'GET',
            }),
        }),
        createCategory: builder.mutation<Category, { body: CategoryCreateRequest }>({
            query: ({ body }) => ({
                url: endpoints.dashboard.categories,
                method: 'POST',
                body,
            }),
        }),
        updateCategory: builder.mutation<
            Category,
            { id: string | number; body: CategoryUpdateRequest }
        >({
            query: ({ id, body }) => ({
                url: `${endpoints.dashboard.categories}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteCategory: builder.mutation<{ success: boolean } | void, { id: string | number }>({
            query: ({ id }) => ({
                url: `${endpoints.dashboard.categories}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
