import { Modal, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance, { endpoints } from '@/utils/axios';
import ClearableInput from '@/components/clearable-input';
import compactDataTableStyles from '@/components/data-table/styles';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

const SettingComponent: React.FC = () => {
    const [settings, setSettings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [id, setId] = useState<string>('');

    const getDataMedia = useCallback(() => {
        setLoading(true);
        axiosInstance
            .get(endpoints.main.settings)
            .then((res) => {
                setSettings(res.data || []);
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getDataMedia();
    }, [getDataMedia]);

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (value === '') {
                toast.warning('Vui lòng điền thông tin!');
                return;
            }
            if (id) {
                axiosInstance
                    .put(`${endpoints.main.settings}/${id}`, { value })
                    .then(() => {
                        setShowModal(false);
                        setValue('');
                        setId('');
                        toast.success('Cập nhật thành công!');
                        getDataMedia();
                    })
                    .catch((_err) => toast.error('Có lỗi xảy ra'));
            }
        },
        [getDataMedia, id, value]
    );

    const columns = useMemo(
        () => [
            { name: '#', selector: 'id', sortable: true },
            { name: 'Thông báo', selector: 'value', sortable: true },
            {
                name: 'Chức năng',
                selector: (row: any) => row.id,
                cell: (row: any) => (
                    <Button
                        type="button"
                        className="btn btn-warning white"
                        onClick={() => {
                            setId(String(row.id));
                            setValue(String(row.value || ''));
                            setTitleModal('Cập nhật thông báo');
                            setShowModal(true);
                        }}
                    >
                        Sửa
                    </Button>
                ),
            },
        ],
        []
    );

    return (
        <>
            <h1 className="mt-10"> Cài đặt thông báo</h1>
            <ToastContainer autoClose={1000} />
            <DataTable
                title=""
                columns={columns as any}
                data={settings}
                defaultSortFieldId="title"
                progressPending={loading}
                pagination
                responsive
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
                        <ClearableInput
                            className="form-control"
                            type="text"
                            name="value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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
};

export default SettingComponent;
