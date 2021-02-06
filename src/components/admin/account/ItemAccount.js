import React from 'react';

const ItemAccount = props => {
    function onDelete(id) {
        if (window.confirm(`Bạn có muốn xóa ${props.lastName} ? `)) {
            props.onDelete(id);
        }
    }

    function onEdit(id) {
        props.onEdit(id);
    }
    return (
        <>
            <tr>
                <td>{props.index + 1}</td>
                <td>{props.firstName + ' ' + props.lastName}</td>
                <td>{props.phone}</td>
                <td>{props.email}</td>
                <td>{props.role}</td>
                <td>{props.createDate.slice(0, 10).split('-').reverse().join('/')}</td>
                <td>{props.writeDate.slice(0, 10).split('-').reverse().join('/')}</td>
                <td className="text-center">
                    <button
                        className="btn btn-warning mr-10 white"
                        onClick={() => onEdit(props.id)}>
                        Sửa
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(props.id)}>
                        Xóa
                    </button>
                </td>
            </tr>
        </>
    );
}

export default ItemAccount;