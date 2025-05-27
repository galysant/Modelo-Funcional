import React, { useState } from 'react';
import { inventory } from '../mock/inventory';
import { products } from '../mock/products';

const InventoryView = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const branchInventory = inventory.filter(item => item.branchId === user.branchId);

  const filteredInventory = branchInventory.filter(item => {
    const product = products.find(p => p.id === item.productId);
    return product && product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-bold mb-6">Inventario</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
      />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map(item => {
              const product = products.find(p => p.id === item.productId);
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product ? product.name : 'Producto Desconocido'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product ? product.sku : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.minStock}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryView;