import React from 'react';

const ItemCategory = (props) => {
    function onDelete(id) {
        if (window.confirm(`Bạn có muốn xóa ${props.name} ? `)) {
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
                <td>{props.name}</td>
                <td className="text-center">
                    <button className="btn btn-warning mr-10 white" onClick={() => onEdit(props.id)}>
                        Sửa
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(props.id)}>
                        Xóa
                    </button>
                </td>
            </tr>
        </>
    );
};

export default ItemCategory;
