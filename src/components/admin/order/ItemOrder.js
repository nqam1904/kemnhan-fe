import React, { Component } from 'react';

class ItemOrder extends Component {
    render() {
        return (
            <>
            <tr>
                {/* <td>{props.index + 1}</td>
                <td>{props.firstName + ' ' + props.lastName}</td>
               
                <td>{"0" + props.phone}</td>
                <td>{props.email}</td>
                <td>{props.role}</td>
                <td>{props.createDate.slice(0, 10).split('-').reverse().join('/')}</td>
                <td>{props.writeDate.slice(0, 10).split('-').reverse().join('/')}</td> */}
                <td className="text-center">
                    <button
                        className="btn btn-warning mr-10 white"
                       >
                        Sửa
                    </button>
                    <button className="btn btn-danger" >
                        Xóa
                    </button>
                </td>
            </tr>
        </>
        );
    }
}

export default ItemOrder;