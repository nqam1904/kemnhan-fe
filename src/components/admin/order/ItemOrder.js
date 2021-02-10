
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Spinner, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { API_URL } from '../../../config/setting';

const onStatus = (item) => {
    switch (item) {
        case 1:
            return "Chờ duyệt";
        case 2:
            return "Đang giao hàng";
        case 3:
            return "Hoàn thành đơn";
        case 4:
            return "Từ chối đơn hàng";
    }
}

const statusButton = (status) => {
    switch (status) {
        case 1:
            return "Duyệt đơn hàng";
        case 2:
            return "Đã giao hàng"
        case 3:
            return ""
        default:
            return ""
    }
}

const popover = (userInfo) => (
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

const ItemOrder = props => {
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        GetCutomer();
    }, [])
    const GetCutomer = () => {
        axios.get(`${API_URL}/customers/${props.id}`)
            .then((response) => {
                setUserInfo(response.data)
            })
            .catch((error) => { return error })
    }
    return (
        <>
            <tr>
                <td>{props.index + 1}</td>
                <td>{props.name}</td>
                <td>{props.phone}</td>
                <td>{props.amountTotal}</td>
                <td>{props.note}</td>
                <td>{props.createDate.slice(0, 10).split('-').reverse().join('/')}</td>
                <td>{onStatus(props.status).toString()}</td>

                <td className="text-center">
                    {statusButton(props.status) === '' ?
                        (<OverlayTrigger trigger="click" placement="left" overlay={popover(userInfo)}>
                            <Button variant="primary" className=" ml-10"><img src={require('../../../res/image/eye.png').default} style={{ tintColor: 'red' }} width={20} /> </Button>
                        </OverlayTrigger>) :
                        <>
                            <button onClick={() => props.onEdit()}
                                className="btn btn-info mr-10">
                                {statusButton(props.status)}
                            </button>
                            <button className="btn btn-danger" onClick={() => props.onDelete()}>
                                Từ chối đơn hàng
                            </button>
                        </>}
                </td>
            </tr>
        </>
    );
}

export default ItemOrder;