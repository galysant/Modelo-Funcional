import React from 'react';
import { inventory } from '../mock/inventory';
import { products } from '../mock/products';

const DashboardView = ({ user }) => {
  const branchInventory = inventory.filter(item => item.branchId === user.branchId);
  const lowStockItems = branchInventory.filter(item => item.stock <= item.minStock);

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Inventario Total</h3>
          <p className="text-3xl font-bold">{branchInventory.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Productos con Bajo Stock</h3>
          <p className="text-3xl font-bold text-red-500">{lowStockItems.length}</p>
        </div>
        {/* Puedes añadir más métricas aquí */}
      </div>

      {lowStockItems.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Alertas de Bajo Stock</h3>
          <ul>
            {lowStockItems.map(item => {
              const product = products.find(p => p.id === item.productId);
              return (
                <li key={item.id} className="mb-2">
                  {product ? product.name : 'Producto Desconocido'}: {item.stock} unidades
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardView;