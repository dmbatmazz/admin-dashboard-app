'use client';

import { useEffect, useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('products');
      return stored && stored !== "[]" ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', stock: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // İlk fake ürünler — sadece localStorage boşsa ekle
  useEffect(() => {
    const stored = localStorage.getItem('products');
    const isInitialized = localStorage.getItem('products_initialized');

    if (!isInitialized || !stored || stored === "[]") {
      const fakeData = [
        { title: 'Laptop', description: 'Powerful gaming laptop', price: 1500, stock: 5, createdAt: '2024-05-01 12:00' },
        { title: 'Smartphone', description: 'Latest model smartphone', price: 999, stock: 10, createdAt: '2024-05-02 13:00' },
        { title: 'Headphones', description: 'Noise-cancelling headphones', price: 199, stock: 15, createdAt: '2024-05-03 14:00' },
        { title: 'Monitor', description: '4K UHD Monitor', price: 350, stock: 7, createdAt: '2024-05-04 15:00' },
        { title: 'Keyboard', description: 'Mechanical keyboard', price: 120, stock: 20, createdAt: '2024-05-05 16:00' },
        { title: 'Mouse', description: 'Wireless mouse', price: 50, stock: 25, createdAt: '2024-05-06 17:00' },
        { title: 'Webcam', description: 'HD webcam for streaming', price: 80, stock: 8, createdAt: '2024-05-07 18:00' },
      ];

      localStorage.setItem('products', JSON.stringify(fakeData));
      localStorage.setItem('products_initialized', 'true');
      setProducts(fakeData);
    }
  }, []);

  // products değiştiğinde localStorage güncelle
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleAdd = () => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = { ...newProduct, createdAt: updated[editIndex].createdAt };
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([{ ...newProduct, createdAt: now }, ...products]);
    }
    setNewProduct({ title: '', description: '', price: '', stock: '' });
    setShowAddForm(false);
  };

  const handleEdit = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    setShowAddForm(true);
  };

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          <PlusCircle className="add-icon" />
          Add New
        </button>
      </div>

      {showAddForm && (
        <div className="overlay">
          <div className="add-user-form">
            <h3>{editIndex !== null ? 'Edit Product' : 'Add New Product'}</h3>
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <button className="confirm-add-btn" onClick={handleAdd}>
              {editIndex !== null ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p, i) => (
            <tr key={i}>
              <td>{p.title}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.createdAt}</td>
              <td>{p.stock}</td>
              <td>
                <button className="action-btn edit" onClick={() => handleEdit(i)}>Edit</button>
                <button className="action-btn delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
