import { CONFIG } from '@/config-global';
import axios from 'axios';
import ImageAssets from 'constants/ImagesAsset';
import { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { fNumber } from 'utils/format-number';

interface ItemOrderProps {
    item: {
        id: any;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        address: string;
        note: string;
        status: number;
        createDate: string;
        orderDetails: any[];
    };
    onUpdateStatus: (id: any, status: any) => void;
}

const onStatus = (item: any) => {
    switch (item) {
        case 1:
            return 'Chờ duyệt';
        case 2:
            return 'Đang giao hàng';
        case 3:
            return 'Hoàn thành đơn';
        case 4:
            return 'Từ chối đơn hàng';
        default:
            return '';
    }
};

const statusButton = (status: any) => {
    switch (status) {
        case 1:
            return 'Duyệt đơn hàng';
        case 2:
            return 'Đã giao hàng';
        case 3:
            return '';
        default:
            return '';
    }
};

const popover = (userInfo: any) => (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Thông tin khách hàng</Popover.Title>
        <Popover.Content>
            <p>{`Họ tên: ${userInfo?.firstName} ${userInfo?.lastName}`}</p>
            <p>{`Số điện thoại: ${userInfo?.phone}`}</p>
            <p>{`Email: ${userInfo?.email}`}</p>
            <p>{`Địa chỉ: ${userInfo?.address}`}</p>
        </Popover.Content>
    </Popover>
);

const ItemOrder = (props: any) => {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        GetCutomer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const GetCutomer = () => {
        axios
            .get(`${CONFIG.serverUrl}/customers/${props.id}`)
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((_error) => {
                return null;
            });
    };
    return (
        <>
            <tr>
                <td>{props.index + 1}</td>
                <td>{props.name}</td>
                <td>{props.phone}</td>
                <td>{fNumber(props.amountTotal)} VNĐ</td>
                <td>{props.note}</td>
                <td>{props.createDate.slice(0, 10).split('-').reverse().join('/')}</td>
                <td>{onStatus(props.status).toString()}</td>

                <td className="text-center">
                    {statusButton(props.status) === '' ? (
                        <OverlayTrigger
                            trigger="click"
                            placement="left"
                            overlay={popover(userInfo)}
                        >
                            <Button variant="info" className=" ml-10">
                                <img
                                    alt="imageEye"
                                    src={ImageAssets.information}
                                    style={{ color: 'red' }}
                                    width={20}
                                />
                            </Button>
                        </OverlayTrigger>
                    ) : (
                        <>
                            <button
                                onClick={() => props.onEdit()}
                                className="btn btn-primary mr-10"
                            >
                                {statusButton(props.status)}
                            </button>
                            <button className="btn btn-danger" onClick={() => props.onDelete()}>
                                Từ chối đơn hàng
                            </button>
                        </>
                    )}
                </td>
            </tr>
        </>
    );
};

export default ItemOrder;
