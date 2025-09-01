import React, { useState } from 'react';

const TaskForm = ({onAddTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            alert('Please fill in both title and description.');
            return;
        }

        const newTask = {title, description};
        onAddTask(newTask);

        setTitle('');
        setDescription('');
    };

    return (
        <center>
            <form onSubmit={handleSubmit}>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <td style={labelStyle}><strong>Task Title:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={inputStyle}
                                    placeholder="Enter task title"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={labelStyle}><strong>Description:</strong></td>
                            <td>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter task description"
                                    style={textareaStyle}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" style={submitButtonStyle}>Add Task</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </center>
    );
};

const tableStyle = {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    marginTop: '20px',
    width: '100%',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
};

const labelStyle = {
    paddingRight: '10px',
    paddingBottom: '10px',
    textAlign: 'right',
    verticalAlign: 'top'
};

const inputStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px'
};

const textareaStyle = {
    width: '100%',
    maxWidth: '400px',
    height: '100px',
    padding: '10px',
    resize: 'none',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px'
};

const submitButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    width: '100%'
};

export default TaskForm;
