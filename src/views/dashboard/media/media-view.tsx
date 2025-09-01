import compactDataTableStyles from '@/components/data-table/styles';
import {
    useGetSettingsQuery,
    useLazyGetSettingByIdQuery,
    useUpdateSettingMutation,
} from '@/store/apis/settings';
import type { Setting } from '@/store/types/setting';
import { fDate } from '@/utils/format-time';
import React, { useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

function MediaComponent(): React.ReactNode {
    const { data: media = [], isLoading, refetch } = useGetSettingsQuery();
    const [getById] = useLazyGetSettingByIdQuery();
    const [updateSetting] = useUpdateSettingMutation();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [value, setValue] = useState('');
    const [id, setId] = useState<string | number | null>(null);

    const onEdit = async (editId: any) => {
        try {
            const res = await getById(editId).unwrap();
            setId(editId);
            setShowModal(true);
            setTitleModal('Cập nhật danh mục');
            setValue(res.value);
        } catch (_error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value.trim() || !id) {
            toast.warning('Vui lòng điền thông tin!');
            return;
        }

        try {
            await updateSetting({ id, body: { value } }).unwrap();
            setShowModal(false);
            setValue('');
            setId(null);
            toast.success('Cập nhật thành công!');
            refetch();
        } catch (_error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const columns = useMemo(
        () => [
            {
                name: '#',
                selector: (row: Setting) => row.id,
                sortable: true,
            },
            {
                name: 'Media',
                selector: (row: Setting) => row.value,
                sortable: true,
            },
            {
                name: 'Ngày tạo',
                selector: (row: Setting) => row.createDate || '',
                right: true,
                cell: (row: Setting) => <span>{fDate(row.createDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Ngày chỉnh sửa',
                selector: (row: Setting) => row.writeDate || '',
                right: true,
                cell: (row: Setting) => <span>{fDate(row.writeDate, 'DD/MM/YYYY')}</span>,
            },
            {
                name: 'Hành động',
                selector: (data: Setting) => (
                    <>
                        <Button
                            type="button"
                            className="btn btn-success white mr-10"
                            onClick={() => onEdit(data.id)}
                        >
                            Cập nhật
                        </Button>
                    </>
                ),
            },
        ],
        [onEdit]
    );

    return (
        <>
            <h1 className="mt-10"> Link youtube</h1>
            <ToastContainer autoClose={1000} />

            <DataTable
                title="Youtube"
                columns={columns as any}
                data={media as any}
                defaultSortFieldId="title"
                pagination
                progressPending={isLoading}
                responsive={true}
                dense
                customStyles={compactDataTableStyles}
            />
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                }}
                backdrop="static"
            >
                <form onSubmit={onSave}>
                    <Modal.Header closeButton {...({} as any)}>
                        <Modal.Title {...({} as any)}> {titleModal} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label> Link youtube </label>
                        <input
                            className="form-control"
                            name="value"
                            value={value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setValue(e.target.value)
                            }
                        />
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
        </>
    );
}

export default MediaComponent;
