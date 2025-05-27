import React from 'react';

const LayoutHeader = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">SuperStock</h1>
      {user && (
        <div className="flex items-center">
          <span className="mr-4">Hola, {user.username} ({user.role})</span>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Salir
          </button>
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;