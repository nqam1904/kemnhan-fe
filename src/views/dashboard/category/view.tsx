import type { Category as CategoryModel } from '@/store/types/category';

import { z } from 'zod';
import { fDate } from '@/utils/format-time';
import React, { useMemo, useState } from 'react';
import ImageAssets from '@/constants/ImagesAsset';
import DataTable from 'react-data-table-component';
import { Form, Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '@/store/apis/category';

const CategoryView: React.FC = () => {
    const { data: categories = [], isLoading, refetch } = useGetCategoriesQuery();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; id: any; label: string }>({
        show: false,
        id: null,
        label: '',
    });

    type CategoryForm = { id: string | number | null; name: string };
    const initialForm: CategoryForm = { id: null, name: '' };
    const [form, setForm] = useState<CategoryForm>(initialForm);
    const [errors, setErrors] = useState<Partial<Record<'name', string>>>({});

    const schema = z.object({ name: z.string().min(1, 'Vui lòng nhập tên danh mục!') });

    const onEdit = (category: CategoryModel) => {
        setForm({ id: category.id, name: category.name });
        setTitleModal('Cập nhật danh mục');
        setShowModal(true);
    };

    const onRequestDelete = (category: CategoryModel) => {
        const label = category.name || `#${category.id}`;
        setConfirmDelete({ show: true, id: category.id, label });
    };

    const onDelete = async (categoryId: any) => {
        try {
            await deleteCategory({ id: categoryId }).unwrap();
            toast.success('Xóa thành công');
            await refetch();
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { id, ...payload } = form;
        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
            const fieldErrors: any = {};
            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as 'name';
                if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});

        try {
            if (id) {
                await updateCategory({ id, body: parsed.data as any }).unwrap();
                toast.success('Cập nhật thành công!');
            } else {
                await createCategory({ body: parsed.data as any }).unwrap();
                toast.success('Thêm thành công!');
            }
            await refetch();
            setShowModal(false);
            resetForm();
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Tên danh mục',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Ngày tạo',
                selector: 'createDate',
                sortable: true,
                right: true,
                cell: (row: any) => <span>{fDate(row.createDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Ngày chỉnh sửa',
                selector: 'writeDate',
                sortable: true,
                right: true,
                cell: (row: any) => <span>{fDate(row.writeDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Chức năng',
                selector: (data: any, _b: any) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-warning white mr-10"
                            onClick={() => onEdit(data)}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="button"
                            className="btn btn-danger white"
                            onClick={() => onRequestDelete(data)}
                        >
                            Xoá
                        </Button>
                    </>
                ),
            },
        ],
        [onDelete, onEdit]
    );

    const tableStyles = useMemo(
        () => ({
            rows: {
                style: {
                    minHeight: '42px',
                },
            },
            headCells: {
                style: {
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                },
            },
            cells: {
                style: {
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                },
            },
        }),
        []
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-10 mbt-10">
                <h1 className="m-0">Danh sách danh mục</h1>
                <div>
                    <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setShowModal(true);
                            setTitleModal('Thêm danh mục');
                            setForm(initialForm);
                            setErrors({});
                        }}
                    >
                        Thêm danh mục
                    </Button>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
            <DataTable
                title=""
                columns={columns}
                data={categories}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive
                dense
                customStyles={tableStyles}
            />
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                backdrop="static"
            >
                <form onSubmit={onSave} noValidate>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                            Tên danh mục <sup className="sub_text text-danger">*</sup>
                        </label>
                        <div className="position-relative">
                            <Form.Control
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                name="name"
                                value={form.name}
                                onChange={(e) => {
                                    setForm((prev) => ({ ...prev, name: e.target.value }));
                                    setErrors((prev) => ({ ...prev, name: undefined }));
                                }}
                                required
                                style={{ paddingRight: form.name ? '2.25rem' : undefined }}
                            />
                            {form.name ? (
                                <Button
                                    variant="link"
                                    className="position-absolute border-0 bg-transparent p-0"
                                    style={{ right: '0.5rem', top: '50%', transform: 'translateY(-50%)' }}
                                    aria-label="Clear"
                                    onClick={() => {
                                        setForm((prev) => ({ ...prev, name: '' }));
                                        setErrors((prev) => ({ ...prev, name: undefined }));
                                    }}
                                >
                                    <img src={ImageAssets.ic_clear} alt="clear" width={16} height={16} />
                                </Button>
                            ) : null}
                        </div>
                        <div className={`invalid-feedback ${errors.name ? 'd-block' : ''}`}>
                            {errors.name}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                setShowModal(false);
                                resetForm();
                            }}
                        >
                            Đóng
                        </Button>
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <Modal
                show={confirmDelete.show}
                onHide={() => setConfirmDelete({ show: false, id: null, label: '' })}
                centered
                backdrop="static"
            >
                <Modal.Header closeButton {...({} as any)}>
                    <Modal.Title {...({} as any)}>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xoá danh mục &quot;{confirmDelete.label}&quot; không?
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

export default CategoryView;
