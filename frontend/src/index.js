// index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store';
import store1 from './redux1/store';

function Index() {
  const initialRole = localStorage.getItem('role') || 'admin';
  const [selectedStore, setSelectedStore] = useState(initialRole === 'admin'? store : store1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable

  const handleRoleSwitch = (role) => {
    if (role === 'admin') {
      setSelectedStore(store); // Switch to admin store
    } else {
      setSelectedStore(store1); // Switch to users store
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      handleRoleSwitch(role);
      setIsLoggedIn(true); // Set isLoggedIn to true if role exists
    }
  }, []);

  return (
    <React.StrictMode>
      <Provider store={selectedStore}>
        <App onRoleSwitch={handleRoleSwitch} isLoggedIn={isLoggedIn} /> {/* Pass isLoggedIn */}
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Index />);
reportWebVitals();
