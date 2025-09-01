import ClearableInput from '@/components/clearable-input';
import compactDataTableStyles from '@/components/data-table/styles';
import {
    useCreateUserMutation,
    useDeleteUserMutation,
    useLazyGetListUserQuery,
    useUpdateUserMutation,
} from '@/store/apis/account';
import type { Account as AccountModel } from '@/store/types/account';
import { fDate } from '@/utils/format-time';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import * as z from 'zod';

import { ROLE_OPTIONS } from '@/constants/enums';
import ImageAssets from '@/constants/ImagesAsset';

type AccountForm = {
    id: string | number | null;
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
    email: string;
    role: string;
};

type FormErrors = Partial<
    Record<'firstName' | 'lastName' | 'phone' | 'password' | 'email' | 'role', string>
>;

const AccountView: React.FC = () => {
    const [listUser, { isLoading }] = useLazyGetListUserQuery();
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [account, setAccount] = useState<AccountModel[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<{ show: boolean; id: any; label: string }>({
        show: false,
        id: null,
        label: '',
    });

    const initialForm: AccountForm = {
        id: null,
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        email: '',
        role: '',
    };

    const [form, setForm] = useState<AccountForm>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});

    const schema = z.object({
        firstName: z.string().min(1, 'Vui lòng nhập họ'),
        lastName: z.string().min(1, 'Vui lòng nhập tên'),
        phone: z.string().min(10, 'Số điện thoại phải có 10-11 chữ số'),
        password: z
            .union([z.literal(''), z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự')])
            .optional(),
        email: z.string().email('Nhập đúng định dạng email'),
        role: z.string().min(1, 'Vui lòng chọn chức vụ'),
    });

    const getData = async () => {
        try {
            const res = await listUser().unwrap();
            setAccount(res || []);
        } catch (error) {
            console.log(error, 'error');
        }
    };

    useLayoutEffect(() => {
        getData();
    }, []);

    const onEdit = (data: any) => {
        setForm({
            id: data.id ?? null,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone || '',
            password: '',
            email: data.email || '',
            role: data.role || '',
        });
        setTitleModal('Sửa tài khoản');
        setShowPassword(false);
        setShowModal(true);
    };

    const onDelete = async (userId: any) => {
        try {
            await deleteUser({ id: userId }).unwrap();
            toast.success('Xóa thành công');
            getData();
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    const onRequestDelete = (user: any) => {
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        const label = name || user.email || `#${user.id}`;
        setConfirmDelete({ show: true, id: user.id, label });
    };

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Họ',
                selector: 'firstName',
                sortable: true,
            },
            {
                name: 'Tên',
                selector: 'lastName',
                sortable: true,
            },
            {
                name: 'Số điện thoại',
                selector: 'phone',
                sortable: true,
                right: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
                right: true,
            },
            {
                name: 'Chức vụ ',
                selector: 'role',
                sortable: true,
                right: true,
            },
            {
                name: 'Ngày tạo',
                selector: 'createDate',
                sortable: true,
                right: true,
                cell: (row: any) => {
                    return <span>{fDate(row.createDate, 'DD/MM/YYYY')}</span>;
                },
            },
            {
                name: 'Ngày chỉnh sửa',
                selector: 'writeDate',
                sortable: true,
                right: true,
                cell: (row: any) => {
                    return <span>{fDate(row.writeDate, 'DD/MM/YYYY')}</span>;
                },
            },
            {
                name: 'Chức năng',
                selector: (data: any) => (
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

    const resetForm = () => {
        setForm(initialForm);
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do not toggle native Bootstrap validation classes; use Zod-driven errors instead

        const { id, ...payload } = form;
        const schemaToUse = form.id
            ? schema
            : schema.extend({ password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự') });

        const parsed = schemaToUse.safeParse(payload as Required<Omit<AccountForm, 'id'>>);
        if (!parsed.success) {
            const fieldErrors: FormErrors = {};
            parsed.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof FormErrors;
                if (field && !fieldErrors[field]) {
                    fieldErrors[field] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }
        setErrors({});

        try {
            const body: any = { ...parsed.data };
            if (!body.password) {
                delete body.password;
            }

            if (form.id) {
                await updateUser({ id: form.id, body }).unwrap();
                toast.success('Cập nhật thành công!');
            } else {
                await createUser({ body }).unwrap();
                toast.success('Thêm thành công!');
            }

            setShowModal(false);
            resetForm();
            getData();
        } catch (error: any) {
            // If API returns field-level error for phone, reflect it in UI
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target as { name: string; value: string };
        const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 11) : value;
        setForm((prev) => ({ ...prev, [name]: nextValue }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mt-10 mbt-10">
                <h1 className="m-0">Tài khoản</h1>
                <div>
                    <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            resetForm();
                            setTitleModal('Thêm tài khoản');
                            setShowModal(true);
                        }}
                    >
                        Thêm tài khoản
                    </Button>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
            <DataTable
                title="Tài khoản"
                columns={columns}
                data={account}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive={true}
                dense
                customStyles={compactDataTableStyles}
            />

            <Modal
                show={showModal}
                size="lg"
                onHide={() => {
                    setShowModal(false);
                    setErrors({});
                }}
                backdrop="static"
            >
                <form noValidate onSubmit={onSave}>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <small className="text-danger">* là giá trị bắt buộc</small>
                        </div>
                        <div className="row g-4">
                            <div className="form-group col-6 mb-3">
                                <label>
                                    Họ <sup className="sub_text text-danger">*</sup>
                                </label>
                                <ClearableInput
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    name="firstName"
                                    value={form.firstName}
                                    placeholder="Nhập họ"
                                    onChange={handleChange as any}
                                    required
                                />
                                <div className="invalid-feedback">{errors.firstName}</div>
                            </div>
                            <div className=" form-group col-6 mb-3">
                                <label>
                                    Tên <sup className="sub_text text-danger">*</sup>
                                </label>
                                <ClearableInput
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    name="lastName"
                                    placeholder="Nhập tên"
                                    value={form.lastName}
                                    onChange={handleChange as any}
                                    required
                                />
                                <div className="invalid-feedback">{errors.lastName}</div>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className=" form-group col-6 mb-3">
                                <label>
                                    Mật khẩu <sup className="sub_text text-danger">*</sup>
                                </label>
                                <div className="input-group">
                                    <Form.Control
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        value={form.password}
                                        onChange={handleChange}
                                        required={!form.id}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword((v) => !v)}
                                            aria-label={
                                                showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
                                            }
                                        >
                                            <img
                                                src={
                                                    showPassword
                                                        ? ImageAssets.icNoEye
                                                        : ImageAssets.icEye
                                                }
                                                alt={showPassword ? 'Hide' : 'Show'}
                                                style={{ width: 20, height: 20 }}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`invalid-feedback ${errors.password ? 'd-block' : ''}`}
                                >
                                    {errors.password}
                                </div>
                            </div>
                            <div className=" form-group col-6 mb-3">
                                <label>
                                    Số điện thoại <sup className="sub_text text-danger">*</sup>
                                </label>
                                <ClearableInput
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    type="tel"
                                    name="phone"
                                    placeholder="Nhập thông tin số thoại điện"
                                    value={form.phone}
                                    onChange={handleChange as any}
                                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                                        const text = e.clipboardData.getData('text');
                                        if (/\D/.test(text)) e.preventDefault();
                                    }}
                                    inputMode="numeric"
                                    maxLength={11}
                                    required
                                />
                                <div className="invalid-feedback">{errors.phone}</div>
                            </div>
                        </div>

                        <div className="row g-4">
                            <div className=" form-group col-6 mb-3">
                                <label>
                                    Email <sup className="sub_text text-danger">*</sup>
                                </label>
                                <ClearableInput
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    type="email"
                                    placeholder="Nhập thông tin email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange as any}
                                    required
                                />
                                <div className="invalid-feedback">{errors.email}</div>
                            </div>
                            <div className=" form-group col-6 mb-3">
                                <label>
                                    Chức vụ <sup className="sub_text text-danger">*</sup>
                                </label>
                                <Form.Control
                                    as="select"
                                    onChange={handleChange}
                                    value={form.role}
                                    name="role"
                                    required
                                    className={`${errors.role ? 'is-invalid' : ''}`}
                                >
                                    <option value="" disabled>
                                        Chức vụ
                                    </option>
                                    {ROLE_OPTIONS.map((item: any, index: any) => {
                                        return (
                                            <option value={item.name} key={index}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                                <div className="invalid-feedback">{errors.role}</div>
                            </div>
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
                    Bạn có chắc muốn xoá tài khoản "{confirmDelete.label}" không?
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

export default AccountView;
