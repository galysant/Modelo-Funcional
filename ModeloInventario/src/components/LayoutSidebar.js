import React from 'react';

const LayoutSidebar = ({ onNavigate, userRole }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <nav className="flex flex-col space-y-2">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('inventory')}
          className="text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Inventario
        </button>
        {userRole === 'gerente' && (
          <button
            onClick={() => onNavigate('orders')}
            className="text-left py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            Pedidos
          </button>
        )}
      </nav>
    </aside>
  );
};

export default LayoutSidebar;