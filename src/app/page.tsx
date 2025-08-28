// src/app/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';

// --- Interfaces para definir la estructura de nuestros datos ---
interface ProductImage {
  id: number;
  src: string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  images: ProductImage[];
}

// --- El componente principal de nuestra página ---
export default function HomePage() {
  // --- Estados para manejar los datos y la UI ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados para el formulario de nuevo producto
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Estado para saber qué producto estamos editando
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- Lógica de las funciones CRUD (sin cambios) ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) {
      alert('El nombre y el precio son obligatorios.');
      return;
    }
    const newProductData = { name: newName, type: 'simple', regular_price: newPrice, images: [{ src: newImageUrl }] };
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData),
      });
      if (response.ok) {
        alert('¡Producto creado con éxito!');
        setNewName(''); setNewPrice(''); setNewImageUrl('');
        fetchProducts();
      } else { alert('Error al crear el producto.'); }
    } catch (error) { console.error("Error en la creación:", error); }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('¿Estás seguro de que quieres borrar este producto?')) return;
    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Producto borrado con éxito.');
        fetchProducts();
      } else { alert('Error al borrar el producto.'); }
    } catch (error) { console.error("Error al borrar:", error); }
  };

  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updatedData = { name: editingProduct.name, regular_price: editingProduct.price };
    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        alert('Producto actualizado con éxito.');
        setEditingProduct(null);
        fetchProducts();
      } else { alert('Error al actualizar el producto.'); }
    } catch (error) { console.error("Error al actualizar:", error); }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- Renderizado del componente con clases de Tailwind CSS ---
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Panel de Productos WooCommerce</h1>

        {/* --- Formulario para Crear Nuevo Producto --- */}
        <form onSubmit={handleCreateProduct} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Crear Nuevo Producto</h2>
          <div className="space-y-4">
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre del producto" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Precio (ej: 19.99)" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <input type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="URL de la imagen" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <button type="submit" className="mt-4 w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Crear Producto
          </button>
        </form>

        {/* --- Lista de Productos --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Lista de Productos</h2>
          {loading ? (
            <p className="text-gray-500">Cargando productos...</p>
          ) : (
            <ul className="space-y-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <li key={product.id} className="border border-gray-200 p-4 rounded-lg flex flex-col md:flex-row items-center gap-4">
                    <img src={product.images[0]?.src || 'https://via.placeholder.com/80'} alt={product.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-grow w-full">
                      {editingProduct?.id === product.id ? (
                        // --- Formulario de Edición ---
                        <form onSubmit={handleUpdateProduct} className="w-full">
                          <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-2" />
                          <input type="text" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                          <div className="mt-2 space-x-2">
                            <button type="submit" className="bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-green-600">Guardar</button>
                            <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white text-sm font-bold py-1 px-3 rounded-md hover:bg-gray-600">Cancelar</button>
                          </div>
                        </form>
                      ) : (
                        // --- Vista Normal ---
                        <div className="text-gray-800">
                          <strong className="font-semibold">{product.name}</strong> - <span className="text-gray-600">${product.price}</span>
                        </div>
                      )}
                    </div>
                    {editingProduct?.id !== product.id && (
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => setEditingProduct(product)} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-200">Editar</button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200">Borrar</button>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No se encontraron productos. ¡Crea uno!</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}