// src/components/ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(`${baseUrl}/Products`);
    setProducts(response.data);
    console.log(response.data);
  };


    
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${baseUrl}/Products`, form);
    fetchProducts(); // Refresh the list
    setForm({ name: '', description: '', quantity: '' }); // Reset form
  };

  return (
    <div>
      <h2>Products List</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>CreateBy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.prodName}</td>
              <td>{prod.description}</td>
              <td>₹{prod.price}</td>
              <td>{new Date(prod.createdDate).toISOString().split('T')[0]}</td>
              <td>
                <button onClick={() => console.log(`Edit ${prod.id}`)}>Edit</button>
                <button onClick={() => console.log(`Delete ${prod.id}`)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Create New Product</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ProductPage;
