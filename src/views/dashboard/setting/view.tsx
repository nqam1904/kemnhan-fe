import ClearableInput from '@/components/clearable-input';
import compactDataTableStyles from '@/components/data-table/styles';
import { CONFIG } from '@/config-global';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { toast, ToastContainer } from 'react-toastify';

const SettingComponent: React.FC = () => {
    const [settings, setSettings] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [titleModal, setTitleModal] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [id, setId] = useState<string>('');

    const getDataMedia = useCallback(() => {
        axios
            .get(`${CONFIG.serverUrl}/settings`)
            .then((res) => {
                setSettings(res.data || []);
            })
            .catch((_err) => {
                toast.error('Có lỗi xảy ra');
            });
    }, []);

    useEffect(() => {
        getDataMedia();
    }, [getDataMedia]);

    const onEdit = useCallback((settingId: any) => {
        axios
            .get(`${CONFIG.serverUrl}/settings/${settingId}`)
            .then((res) => {
                setId(settingId);
                setShowModal(true);
                setTitleModal('Cập nhật danh mục');
                setValue(res.data.value || '');
            })
            .catch((_err) => toast.error('Có lỗi xảy ra'));
    }, []);

    const onSave = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (value === '') {
                toast.warning('Vui lòng điền thông tin!');
                return;
            }
            if (id) {
                axios
                    .put(`${CONFIG.serverUrl}/settings/${id}`, { value })
                    .then((_res) => {
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
        ],
        []
    );

    return (
        <>
            <h1 className="mt-10"> Cài đặt thông báo</h1>
            <ToastContainer autoClose={1000} />
            <DataTable
                title="Thông báo"
                columns={columns as any}
                data={settings}
                defaultSortFieldId="title"
                pagination
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
