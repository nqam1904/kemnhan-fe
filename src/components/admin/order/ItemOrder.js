
import React from 'react';
import { Spinner, Button } from 'react-bootstrap';

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
const ItemOrder = props => {
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
                    <button
                        className="btn btn-info mr-10">
                        Duyệt đơn hàng
                    </button>
                    <button className="btn btn-danger" >
                        Từ chối đơn hàng
                    </button>
                    {/* <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
    Loading...
  </Button> */}
                </td>
            </tr>
        </>
    );
}

export default ItemOrder;