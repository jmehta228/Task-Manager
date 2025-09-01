import React from 'react';

const TaskList = ({ tasks, onDelete, onComplete, onUndo }) => {
    return (
        <div>
            <center>
                <h2>Task List</h2>
            </center>
            {tasks.length === 0 ? (
                <center>
                    <strong>
                        <p>No tasks yet. Add one!</p>
                    </strong>
                </center>
            ) : (
                <center>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={headerStyle}>Title</th>
                                <th style={headerStyle}>Description</th>
                                <th style={headerStyle}>Completed?</th>
                                <th style={{ ...headerStyle, width: "220px"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id || task._id}>
                                    <td style={cellStyle}>{task.title}</td>
                                    <td style={cellStyle}>{task.description}</td>
                                    <td style={{ ...cellStyle, width: '50px' }}>{task.completed ? 'Yes' : 'No'}</td>
                                    <td style={{ ...cellStyle, width: "220px" }}>
                                    {task.completed ? (
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() => onDelete(task.id || task._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            style={undoButtonStyle}
                                            onClick={() => onUndo(task.id || task._id)}
                                        >
                                            Undo
                                        </button>
                                        </div>
                                    ) : (
                                        <button
                                        style={completeButtonStyle}
                                        onClick={() => onComplete(task.id || task._id)}
                                        >
                                        Complete
                                        </button>
                                    )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </center>
            )}
        </div>
    );
};

const tableStyle = {
    width: '90%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
};

const headerStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
};

const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
};

const completeButtonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: "100%"
};

const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: "100%"
};

const undoButtonStyle = {
  backgroundColor: 'orange',
  color: 'white',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: "100%"
};


export default TaskList;






















// import React from 'react';

// const TaskList = ({ tasks, onDelete, onComplete, onUndo }) => {
//   // Guard against non-array to avoid ".map is not a function"
//   const safeTasks = Array.isArray(tasks) ? tasks : [];
//   if (!Array.isArray(tasks)) {
//     console.warn('TaskList expected tasks to be an array, got:', typeof tasks, tasks);
//   }

//   return (
//     <div>
//       <center><h2>Task List</h2></center>

//       {safeTasks.length === 0 ? (
//         <center><strong><p>No tasks yet. Add one!</p></strong></center>
//       ) : (
//         <center>
//           <table style={tableStyle}>
//             <colgroup>
//               <col style={{ width: '28%' }} />
//               <col style={{ width: '42%' }} />
//               <col style={{ width: '10%' }} />
//               <col style={{ width: '20%' }} />
//             </colgroup>

//             <thead>
//               <tr>
//                 <th style={headerStyle}>Title</th>
//                 <th style={headerStyle}>Description</th>
//                 <th style={{ ...headerStyle, textAlign: 'center' }}>Completed?</th>
//                 <th style={{ ...headerStyle, textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {safeTasks.map((task) => (
//                 <tr key={task.id || task._id}>
//                   {/* Wrapping cells */}
//                   <td style={wrapCellStyle}>{task.title}</td>
//                   <td style={wrapCellStyle}>{task.description}</td>

//                   <td style={{ ...cellStyle, textAlign: 'center' }}>
//                     {task.completed ? 'Yes' : 'No'}
//                   </td>

//                   <td style={{ ...cellStyle, padding: 0 }}>
//                     {task.completed ? (
//                       <div style={buttonRowStyle}>
//                         <button
//                           style={deleteButtonStyle}
//                           onClick={() => onDelete(task.id || task._id)}
//                         >
//                           Delete
//                         </button>
//                         <button
//                           style={undoButtonStyle}
//                           onClick={() => onUndo(task.id || task._id)}
//                         >
//                           Undo
//                         </button>
//                       </div>
//                     ) : (
//                       <button
//                         style={{ ...completeButtonStyle, width: '100%' }}
//                         onClick={() => onComplete(task.id || task._id)}
//                       >
//                         Complete
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </center>
//       )}
//     </div>
//   );
// };

// /* --- styles --- */
// // Key: tableLayout:'fixed' + wrap styles on cells
// const tableStyle = {
//   width: '90%',
//   borderCollapse: 'collapse',
//   tableLayout: 'fixed',           // enables wrapping in fixed-width columns
//   boxShadow: '0 0 10px rgba(0,0,0,0.1)',
// };

// const headerStyle = {
//   border: '1px solid #ddd',
//   padding: '8px',
//   backgroundColor: '#f2f2f2',
//   textAlign: 'left',
// };

// const cellStyle = {
//   border: '1px solid #ddd',
//   padding: '8px',
// };

// // Allow multi-line wrapping (titles/descriptions)
// const wrapCellStyle = {
//   ...cellStyle,
//   whiteSpace: 'normal',           // allow multiple lines
//   overflowWrap: 'anywhere',       // break long words/URLs
//   wordBreak: 'break-word',        // extra safety for single long tokens
//   lineHeight: 1.3,
//   minWidth: 0,                    // helps in flex/table overflow edge-cases
// };

// const buttonRowStyle = {
//   display: 'flex',
//   gap: '10px',
//   padding: '8px',
// };

// const completeButtonStyle = {
//   backgroundColor: 'green',
//   color: 'white',
//   padding: '6px 12px',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// const deleteButtonStyle = {
//   backgroundColor: 'red',
//   color: 'white',
//   padding: '6px 12px',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   flex: 1,
// };

// const undoButtonStyle = {
//   backgroundColor: 'orange',
//   color: 'white',
//   padding: '6px 12px',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   flex: 1,
// };

// export default TaskList;
