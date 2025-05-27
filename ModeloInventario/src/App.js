import React, { useState, useEffect } from 'react';
import AuthLoginForm from './components/AuthLoginForm';
import LayoutHeader from './components/LayoutHeader';
import LayoutSidebar from './components/LayoutSidebar';
import DashboardView from './components/DashboardView';
import InventoryView from './components/InventoryView';
import OrdersView from './components/OrdersView';
import { getStorage, setStorage } from './utils/storage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(getStorage('currentUser'));
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    if (currentUser) {
      setStorage('currentUser', currentUser);
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (!currentUser) {
    return <AuthLoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <LayoutHeader user={currentUser} onLogout={handleLogout} />
      <div className="flex flex-1">
        <LayoutSidebar onNavigate={handleNavigate} userRole={currentUser.role} />
        <main className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardView user={currentUser} />}
          {currentPage === 'inventory' && <InventoryView user={currentUser} />}
          {currentPage === 'orders' && <OrdersView user={currentUser} />}
        </main>
      </div>
    </div>
  );
};

export default App;

// DONE