import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { getTasks, createTask, deleteTaskById, updateTaskStatus } from './services/TaskService';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      fetchTasks();
    }
  }, []);

  const fetchTasks = () => {
    getTasks()
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const addTask = (newTask) => {
    createTask(newTask)
      .then(() => fetchTasks())
      .catch(error => console.error('Error adding task:', error));
  };

  const deleteTask = (taskId) => {
    deleteTaskById(taskId)
      .then(() => fetchTasks())
      .catch(error => console.error('Error deleting task:', error));
  };

  const markTaskComplete = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId || task._id === taskId);
    if (!taskToUpdate) return;
  
    const updatedTask = {
      ...taskToUpdate,
      completed: true
    };
  
    updateTaskStatus(taskId, updatedTask)
      .then(() => fetchTasks())
      .catch(error => console.error('Error marking task complete:', error));
  };

  const undoTaskComplete = (taskId) => {
    const taskToRevert = tasks.find(task => task.id === taskId || task._id === taskId);
    if (!taskToRevert) return;

    const updatedTask = {
      ...taskToRevert,
      completed: false
    };

    updateTaskStatus(taskId, updatedTask)
      .then(() => fetchTasks())
      .catch(error => console.error('Error undoing task:', error));
  };


  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    fetchTasks();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  const handleRegister = () => {
    // Registration success - log the user in directly
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setShowRegister(false);
    fetchTasks();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <center><h1>Task Manager</h1></center>
      {!isLoggedIn ? (
        showRegister ? (
          <RegisterForm 
            onRegister={handleRegister} 
            onSwitchToLogin={handleSwitchToLogin} 
          />
        ) : (
          <LoginForm 
            onLogin={handleLogin} 
            onSwitchToRegister={handleSwitchToRegister} 
          />
        )
      ) : (
        <div>
          <TaskForm onAddTask={addTask} />
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onComplete={markTaskComplete}
            onUndo={undoTaskComplete}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
          </div>
        </div>
      )}

      <footer style={footerStyle}>
        Mehta Software Development - Task Manager
      </footer>
    </div>
  );
};

const footerStyle = {
  marginTop: 'auto',
  padding: '20px',
  backgroundColor: '#1677f5',
  textAlign: 'center',
  fontSize: '20px',
  color: "white"
};

const logoutButtonStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  marginBottom: '40px',
  marginTop: '40px',
  width: "40%",
};

export default App;