import React from 'react';

interface ItemMediaProps {
  id: any;
  name: string;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
}


const ItemMedia = (props: any) => {
    function _onDelete(id: any) {
        if (window.confirm(`Bạn có muốn xóa ${props.name} ? `)) {
            props.onDelete(id);
        }
    }

    function onEdit(id: any) {
        props.onEdit(id);
    }
    return (
        <>
            <tr>
                <td>{props.index + 1}</td>
                <td>{props.value}</td>
                <td className="text-center">
                    <button className="btn btn-success mr-10 white" onClick={() => onEdit(props.id)}>
                        Cập nhật
                    </button>
                    {/* <button className="btn btn-danger" onClick={() => onDelete(props.id)}>
            Xóa
        </button> */}
                </td>
            </tr>
        </>
    );
};

export default ItemMedia;
