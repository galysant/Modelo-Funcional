import React, { useState } from 'react';
import { products } from '../mock/products';
import { suppliers } from '../mock/suppliers';

const OrdersView = ({ user }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  const handlePlaceOrder = () => {
    if (!selectedProduct || !quantity) {
      setOrderMessage('Por favor, selecciona un producto y cantidad.');
      return;
    }
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (product) {
      const supplier = suppliers.find(s => s.id === product.supplierId);
      setOrderMessage(`Pedido de ${quantity} unidades de ${product.name} enviado al proveedor ${supplier ? supplier.name : 'desconocido'}.`);
      // Aquí iría la lógica real para enviar el pedido
    } else {
      setOrderMessage('Producto no encontrado.');
    }
  };

  if (user.role !== 'gerente') {
    return (
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-6">Pedidos</h2>
        <p className="text-red-500">No tienes permisos para acceder a esta sección.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-bold mb-6">Realizar Pedido</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Producto:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Selecciona un producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cantidad:</label>
          <input
            type="number"
            placeholder="Cantidad"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Realizar Pedido
        </button>
        {orderMessage && <p className="mt-4 text-center text-sm">{orderMessage}</p>}
      </div>
    </div>
  );
};

export default OrdersView;