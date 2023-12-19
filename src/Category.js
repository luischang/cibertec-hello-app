import React, { useEffect, useState } from "react";
import axios from "axios";

function Category() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [includeProducts, setIncludeProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const categoryData = async () => {
    try {
      const response = await axios.get("http://localhost:5261/api/Category");
      //setData(response.data.data);
      setCategories(response.data.data);
      setLoading(false);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error al consultar las categorias: " + error);
    }
  };

  const categoryProductsData = async () => {
    try {
      if (!selectedCategory) return;

      const endpoint = includeProducts
        ? `http://localhost:5261/api/Category/${selectedCategory}?includeProducts=true`
        : `http://localhost:5261/api/Category/${selectedCategory}?includeProducts=false`;

      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTGlvbmVsIE1lc3NpIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoibWVzc2lAYXJnZW50aW5hLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2RhdGVvZmJpcnRoIjoiMS8wMS8xOTg3IDAwOjAwOjAwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IkFSR0VOVElOQSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiVXNlcklkIjoiMTQiLCJuYmYiOjE3MDI5NTU3MTMsImV4cCI6MTcwMjk1NjMxMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MjYxIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MjYxIn0.gs8EJK9WxqrEy5nxqoV7k5QOYggrbu70zhy4VIvExAY"}`,
        },
      });

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener el detalle de categorias: " + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    categoryData();
    
  }, []);

  useEffect(() => {
    categoryProductsData();
  },[includeProducts, selectedCategory])

  return (
    <div>
      <h3>Categories with Products</h3>
      <label>Selected Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select a Category...</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.description}
          </option>
        ))}
      </select>

      <label>
        <input type="checkbox" checked={includeProducts} onChange={() => setIncludeProducts(!includeProducts)}/>
        Include Products?
      </label>

      {loading ? (
        <p>Loading....</p>
      ) : (
        <div>
            <ul>
                {Array.isArray(data.products)?(
                    data.products.map((product) =>(
                        <li key={product.id}>{product.description}</li>
                    ))
                ):(
                    <p>No hay productos</p>
                )}

            </ul>
        </div>
      )}


      {/* <h1>Categories</h1>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Category;
