import React from 'react';

const Todo = (props) => {
    const { editDisabled, item, onEdit, onDelete } = props;
    return (
        <tr>
            <td className="text-left">{item[0]}</td>
            <td className="text-right">
                <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={editDisabled}
                    onClick={onEdit.bind(this, item[0], item[1])}
                >
                    Edit
                </button>
                <button
                    href=""
                    className="btn btn-danger"
                    onClick={onDelete.bind(this, item[1])}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default Todo;