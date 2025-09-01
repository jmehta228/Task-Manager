import React from 'react';

const TaskItem = ({ task, onDelete }) => {
    return (
        <tr>
            <td style={cellStyle}>{task.title}</td>
            <td style={cellStyle}>{task.description}</td>
            <td style={cellStyle}>{task.completed ? 'Yes' : 'No'}</td>
            <td style={cellStyle}>
                <button 
                    style={{ backgroundColor: 'lightgreen', width: "100%"}}
                    onClick={() => onDelete(task.id || task._id)} >
                    Complete
                </button>
            </td>
        </tr>
    );
};

const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
};

export default TaskItem;
