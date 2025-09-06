import './product.css';

import compactDataTableStyles from '@/components/data-table/styles';
import ImageAssets from '@/constants/ImagesAsset';
import { useGetCategoriesQuery } from '@/store/apis/category';
import {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
    useUpdateProductMutation,
} from '@/store/apis/products';
import axiosInstance from '@/utils/axios';
import { fNumber } from '@/utils/format-number';
import { formatSubstring } from '@/utils/format-string';
import resolveImageUrl from '@/utils/image-url';
import React, { useMemo, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, ToastContainer } from 'react-toastify';
import * as z from 'zod';

const ProductsView: React.FC = () => {
    const { data: products = [], isLoading, refetch } = useGetProductsQuery();
    const { data: categories = [] } = useGetCategoriesQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    type ProductForm = {
        id: string | number | null;
        name: string;
        unit: string;
        description: string;
        displayPrice: number | string;
        sellPrice: number | string;
        stockQuantity: number | string;
        isFeature: boolean;
        isActive: boolean;
        shopeeUrl: string;
        categoryId: string | number | '';
        images: File[];
    };

    const initialForm: ProductForm = {
        id: null,
        name: '',
        unit: '',
        description: '',
        displayPrice: 0,
        sellPrice: 0,
        stockQuantity: 0,
        isFeature: true,
        isActive: true,
        shopeeUrl: '',
        categoryId: '',
        images: [],
    };

    const [form, setForm] = useState<ProductForm>(initialForm);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('Thêm sản phẩm');
    const [errors, setErrors] = useState<
        Partial<
            Record<
                'name' | 'unit' | 'categoryId' | 'sellPrice' | 'stockQuantity' | 'description',
                string
            >
        >
    >({});
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const apiPreviewCountRef = useRef<number>(0);
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; id: any; label: string }>({
        show: false,
        id: null,
        label: '',
    });

    const schema = z.object({
        name: z.string().min(1, 'Vui lòng nhập tên sản phẩm!'),
        unit: z.string().min(1, 'Vui lòng nhập đơn vị!'),
        categoryId: z
            .union([z.string(), z.number()])
            .refine((v) => String(v).length > 0, 'Vui lòng chọn danh mục!'),
        sellPrice: z
            .union([z.string(), z.number()])
            .refine((v) => String(v).length > 0, 'Vui lòng nhập giá tiền!'),
        stockQuantity: z
            .union([z.string(), z.number()])
            .refine((v) => String(v).length > 0, 'Vui lòng nhập số lượng!'),
        description: z.string().min(1, 'Vui lòng nhập mô tả!'),
    });

    const resetForm = () => {
        setForm(initialForm);
        setImagePreviews([]);
        setErrors({});
        apiPreviewCountRef.current = 0;
    };

    const onEdit = (record: any) => {
        const categoryIdFromIds = Array.isArray(record?.categoriesId)
            ? record.categoriesId[0]
            : undefined;
        const categoryIdFromObjects = Array.isArray(record?.categories)
            ? record.categories?.[0]?.id
            : undefined;
        const categoryId = categoryIdFromIds ?? categoryIdFromObjects ?? '';

        setForm({
            id: record.id,
            name: record.name || '',
            unit: record.unit || '',
            description: record.description || '',
            displayPrice: record.displayPrice || 0,
            sellPrice: fNumber(record.sellPrice || 0),
            stockQuantity: String(record.stockQuantity || 0),
            isFeature: Boolean(record.isFeature),
            isActive: Boolean(record.isActive),
            shopeeUrl: record.shopeeUrl || '',
            categoryId,
            images: [],
        });

        const previews: string[] = Array.isArray(record?.images)
            ? record.images
                .map((img: any) => (img?.key ? String(img.key) : null))
                .filter(Boolean)
                .map((key: any) => resolveImageUrl(`${key}`))
            : [];
        setImagePreviews(previews);
        apiPreviewCountRef.current = previews.length;

        setTitleModal('Cập nhật sản phẩm');
        setShowModal(true);
    };

    const onRequestDelete = (record: any) => {
        const label = record.name || `#${record.id}`;
        setConfirmDelete({ show: true, id: record.id, label });
    };

    const onDelete = async (id: any) => {
        try {
            await deleteProduct({ id }).unwrap();
            toast.success('Xóa thành công');
            refetch();
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const onToggleFeature = async (record: any) => {
        try {
            await updateProduct({ id: record.id, body: { isFeature: !record.isFeature } }).unwrap();
            toast.success('Cập nhật thành công');
            refetch();
        } catch (_e) {
            console.log(_e);
        }
    };

    const onToggleActive = async (record: any) => {
        try {
            await updateProduct({ id: record.id, body: { isActive: !record.isActive } }).unwrap();
            toast.success('Cập nhật thành công');
            refetch();
        } catch (_e) {
            console.log(_e);
        }
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const parsed = schema.safeParse({
            name: form.name,
            unit: form.unit,
            categoryId: form.categoryId,
            sellPrice: form.sellPrice,
            stockQuantity: form.stockQuantity,
            description: form.description,
        });
        if (!parsed.success) {
            const fieldErrors: any = {};
            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as
                    | 'name'
                    | 'unit'
                    | 'categoryId'
                    | 'sellPrice'
                    | 'stockQuantity'
                    | 'description';
                if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});

        try {
            if (form.id) {
                // Upload newly added images (if any) and append to product via imagesId
                let imagesId: Array<string | number> = [];
                if (form.images && form.images.length > 0) {
                    const formData = new FormData();
                    form.images.forEach((file) => formData.append('medias', file));
                    const mediaRes = await axiosInstance.post(`media`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    imagesId = mediaRes?.data?.mediasId || [];
                }

                const body: any = {
                    name: form.name,
                    unit: form.unit,
                    description: form.description,
                    displayPrice: parseInt(String((form.displayPrice as any) || 0).replace(/[^\d]/g, ''), 10),
                    sellPrice: parseInt(String((form.sellPrice as any) || 0).replace(/[^\d]/g, ''), 10),
                    stockQuantity: parseInt(String((form.stockQuantity as any) || 0).replace(/[^\d]/g, ''), 10),
                    isFeature: form.isFeature,
                    isActive: form.isActive,
                    shopeeUrl: form.shopeeUrl,
                    categoriesId: [parseInt(String(form.categoryId), 10)],
                };
                if (imagesId.length > 0) body.imagesId = imagesId;

                await updateProduct({ id: form.id, body }).unwrap();
                toast.success('Cập nhật thành công!');
            } else {
                const formData = new FormData();
                if (form.images && form.images.length > 0) {
                    form.images.forEach((file) => formData.append('medias', file));
                }
                const mediaRes = await axiosInstance.post(`media`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                const imagesId = mediaRes?.data?.mediasId || [];
                await createProduct({
                    body: {
                        name: form.name,
                        unit: form.unit,
                        description: form.description,
                        displayPrice: parseInt(String((form.displayPrice as any) || 0).replace(/[^\d]/g, ''), 10),
                        sellPrice: parseInt(String((form.sellPrice as any) || 0).replace(/[^\d]/g, ''), 10),
                        stockQuantity: parseInt(String((form.stockQuantity as any) || 0).replace(/[^\d]/g, ''), 10),
                        isFeature: form.isFeature,
                        isActive: form.isActive,
                        shopeeUrl: form.shopeeUrl,
                        categoriesId: [parseInt(String(form.categoryId), 10)],
                        imagesId,
                    },
                }).unwrap();
                toast.success('Thêm thành công!');
            }

            setShowModal(false);
            resetForm();
            refetch();
        } catch (_e) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const columns = useMemo(
        () => [
            { name: '#', selector: 'id', sortable: true },
            { name: 'Tên sản phẩm', selector: 'name', sortable: true },
            {
                name: 'Hình ảnh',
                selector: (row: any) => row.images?.[0]?.key || '',
                cell: (row: any) => {
                    const key = row.images?.[0]?.key;
                    const src = key ? resolveImageUrl(`${key}`) : ImageAssets.logo;

                    return (
                        <div style={{ padding: 8 }}>
                            <LazyLoadImage
                                src={src}
                                alt={row.name}
                                width={80}
                                height={80}
                                effect="blur"
                                placeholderSrc={ImageAssets.logo}
                                style={{ objectFit: 'cover', borderRadius: 4 }}
                            />
                        </div>
                    );
                },
            },
            {
                name: 'Giá tiền',
                selector: 'sellPrice',
                cell: (row: any) => <span>{fNumber(row.sellPrice)} VNĐ</span>,
            },
            { name: 'Đã bán', selector: 'soldQuantity' },
            { name: 'Đơn vị', selector: 'unit' },
            { name: 'Số lượng', selector: 'stockQuantity' },
            {
                name: 'Mô tả',
                selector: 'description',
                cell: (row: any) => (
                    <div style={{ maxWidth: 400, overflow: 'hidden' }}>
                        {formatSubstring(row.description || '')}
                    </div>
                ),
            },
            {
                name: 'Nổi bật',
                selector: 'isFeature',
                cell: (row: any) => (
                    <Button variant="link" className="p-0" onClick={() => onToggleFeature(row)}>
                        <img
                            src={row.isFeature ? ImageAssets.icEye : ImageAssets.icNoEye}
                            alt="feature"
                            width={25}
                        />
                    </Button>
                ),
            },
            {
                name: 'Hiển thị',
                selector: 'isActive',
                cell: (row: any) => (
                    <Button variant="link" className="p-0" onClick={() => onToggleActive(row)}>
                        <img
                            src={row.isActive ? ImageAssets.icEye : ImageAssets.icNoEye}
                            alt="active"
                            width={25}
                        />
                    </Button>
                ),
            },
            {
                name: 'Chức năng',
                selector: (row: any) => row.id as any,
                cell: (row: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-warning white mr-10"
                            onClick={() => onEdit(row)}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-danger white"
                            onClick={() => onRequestDelete(row)}
                        >
                            Xoá
                        </Button>
                    </>
                ),
            },
        ],
        []
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-10 mbt-10">
                <h1 className="m-0">Danh sách sản phẩm</h1>
                <div>
                    <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setShowModal(true);
                            setTitleModal('Thêm sản phẩm');
                            resetForm();
                        }}
                    >
                        Thêm sản phẩm
                    </Button>
                    <Button
                        variant="success"
                        className="ml-10"
                        type="button"
                        onClick={() => {
                            window.open('https://kemnhanonline.vn/api/products/export', '_blank');
                        }}
                    >
                        Xuất Excel
                    </Button>
                </div>
            </div>
            <ToastContainer autoClose={1000} />

            <DataTable
                title=""
                columns={columns as any}
                data={products as any}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive
                dense
                customStyles={compactDataTableStyles}
            />

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                animation={false}
                backdrop="static"
            >
                <Form onSubmit={onSave} noValidate>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}>{titleModal.toString()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="product-form">
                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    Danh Mục <sup className="sub_text">*</sup>
                                </label>
                                <Form.Control
                                    as="select"
                                    className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
                                    value={String(form.categoryId)}
                                    onChange={(e) => {
                                        setForm((prev) => ({
                                            ...prev,
                                            categoryId: e.target.value,
                                        }));
                                        setErrors((prev) => ({ ...prev, categoryId: undefined }));
                                    }}
                                >
                                    <option value="">Thêm danh mục</option>
                                    {categories &&
                                        (categories as any[]).map((item: any, index: any) => (
                                            <option value={item.id} key={index}>
                                                {item.name}
                                            </option>
                                        ))}
                                </Form.Control>
                                <div
                                    className={`invalid-feedback ${errors.categoryId ? 'd-block' : ''}`}
                                >
                                    {errors.categoryId}
                                </div>
                            </div>
                            <div className=" form-group col-6">
                                <label>
                                    Tên sản phẩm <sup className="sub_text">*</sup>
                                </label>
                                <Form.Control
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    name="name"
                                    value={form.name}
                                    placeholder="Nhập tên sản phẩm"
                                    onChange={(e) => {
                                        setForm((prev) => ({ ...prev, name: e.target.value }));
                                        setErrors((prev) => ({ ...prev, name: undefined }));
                                    }}
                                />
                                <div className={`invalid-feedback ${errors.name ? 'd-block' : ''}`}>
                                    {errors.name}
                                </div>
                            </div>
                        </div>

                        <Form.Group controlId="product-images">
                            <Form.Label>Hình ảnh (hình đầu tiên sẽ là mặc định)</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const filesList = (e.target as HTMLInputElement).files;
                                    const files = filesList ? Array.from(filesList) : [];
                                    if (!files.length) return;
                                    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
                                    const previews = files.map((file: any) => URL.createObjectURL(file));
                                    setImagePreviews((prev) => [...prev, ...previews]);
                                }}
                            />
                        </Form.Group>
                        {imagePreviews && imagePreviews.length > 0 ? (
                            <div className="mbt-10 show_image">
                                <div className="container testimonial-group">
                                    <div className="row text-center">
                                        <div className="col-xs-4">
                                            {imagePreviews.map((url: string, idx: number) => (
                                                <div
                                                    key={`${url}-${idx}`}
                                                    style={{
                                                        position: 'relative',
                                                        display: 'inline-block',
                                                        marginRight: 8,
                                                        marginBottom: 8,
                                                    }}
                                                >
                                                    <img
                                                        src={url}
                                                        width="100"
                                                        height="auto"
                                                        alt="preview"
                                                    />
                                                    <Button
                                                        variant="link"
                                                        className="p-0"
                                                        aria-label="Remove image"
                                                        onClick={() => {
                                                            try {
                                                                URL.revokeObjectURL(url);
                                                            } catch (_e) {
                                                                console.log(_e);
                                                            }
                                                            setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
                                                            setForm((prev) => {
                                                                const apiCount = apiPreviewCountRef.current;
                                                                if (idx < apiCount) {
                                                                    // Removing an API-loaded image; keep files intact and reduce api count
                                                                    apiPreviewCountRef.current = Math.max(0, apiCount - 1);
                                                                    return prev;
                                                                }
                                                                const fileIndex = idx - apiCount;
                                                                return {
                                                                    ...prev,
                                                                    images: prev.images.filter((_, i) => i !== fileIndex),
                                                                };
                                                            });
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            top: -6,
                                                            right: -6,
                                                            border: 'none',
                                                            background: 'transparent',
                                                            padding: 0,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <img
                                                            src={ImageAssets.ic_clear}
                                                            alt="clear"
                                                            width={18}
                                                            height={18}
                                                        />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ marginBottom: 10 }} />
                        )}

                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    Tiền <sup className="sub_text">*</sup>
                                </label>
                                <Form.Control
                                    className={`form-control ${errors.sellPrice ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="sellPrice"
                                    placeholder="Nhập giá tiền sản phẩm"
                                    value={String(form.sellPrice)}
                                    onChange={(e) => {
                                        const digits = e.target.value.replace(/[^\d]/g, '');
                                        const formatted = fNumber(digits);
                                        setForm((prev) => ({ ...prev, sellPrice: formatted }));
                                        setErrors((prev) => ({ ...prev, sellPrice: undefined }));
                                    }}
                                />
                                <div
                                    className={`invalid-feedback ${errors.sellPrice ? 'd-block' : ''}`}
                                >
                                    {errors.sellPrice}
                                </div>
                            </div>
                            <div className="form-group col-6">
                                <label>
                                    Đơn vị <sup className="sub_text">*</sup>
                                </label>
                                <Form.Control
                                    className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
                                    name="unit"
                                    placeholder="Ví du: Hộp, Cái,..."
                                    value={form.unit}
                                    onChange={(e) => {
                                        setForm((prev) => ({ ...prev, unit: e.target.value }));
                                        setErrors((prev) => ({ ...prev, unit: undefined }));
                                    }}
                                />
                                <div className={`invalid-feedback ${errors.unit ? 'd-block' : ''}`}>
                                    {errors.unit}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className=" form-group col-6">
                                <label>
                                    Số lượng <sup className="sub_text">*</sup>
                                </label>
                                <Form.Control
                                    className={`form-control ${errors.stockQuantity ? 'is-invalid' : ''}`}
                                    type="text"
                                    name="stockQuantity"
                                    placeholder="Nhập số lượng sản phẩm"
                                    value={String(form.stockQuantity)}
                                    onChange={(e) => {
                                        const digits = e.target.value.replace(/[^\d]/g, '');
                                        const capped = Math.min(parseInt(digits || '0', 10), 1000);
                                        setForm((prev) => ({ ...prev, stockQuantity: String(capped) }));
                                        setErrors((prev) => ({ ...prev, stockQuantity: undefined }));
                                    }}
                                />
                                <div
                                    className={`invalid-feedback ${errors.stockQuantity ? 'd-block' : ''}`}
                                >
                                    {errors.stockQuantity}
                                </div>
                            </div>
                            <div className=" form-group col-6">
                                <label> Link Shoppe (Nếu có)</label>
                                <Form.Control
                                    className="form-control"
                                    name="shopeeUrl"
                                    placeholder="Nhập link shoppee nếu có"
                                    value={form.shopeeUrl}
                                    onChange={(e) => {
                                        setForm((prev) => ({ ...prev, shopeeUrl: e.target.value }));
                                    }}
                                />
                            </div>
                        </div>
                        <label> Mô tả </label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            placeholder="Nhập mô tả sản phẩm"
                            name="description"
                            value={form.description}
                            onChange={(e) => {
                                setForm((prev) => ({ ...prev, description: e.target.value }));
                                setErrors((prev) => ({ ...prev, description: undefined }));
                            }}
                        />
                        <div className={`invalid-feedback ${errors.description ? 'd-block' : ''}`}>
                            {errors.description}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Đóng
                        </Button>
                        <Button type="submit">Lưu</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal
                show={confirmDelete.show}
                onHide={() => setConfirmDelete({ show: false, id: null, label: '' })}
                centered
                animation={false}
                backdrop="static"
            >
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xoá sản phẩm &quot;{confirmDelete.label}&quot; không?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => setConfirmDelete({ show: false, id: null, label: '' })}
                    >
                        Huỷ
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={async () => {
                            if (!confirmDelete.id) return;
                            await onDelete(confirmDelete.id);
                            setConfirmDelete({ show: false, id: null, label: '' });
                        }}
                    >
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductsView;
