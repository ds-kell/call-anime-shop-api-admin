import './css/product.css'
import './css/table.css'
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';


const ShowProduct = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const productsPerPage = 16;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredByCategory = selectedCategories.length > 0
    ? products.filter(product => selectedCategories.includes(product.category.name))
    : products;

  const filteredByBrand = selectedBrands.length > 0
    ? filteredByCategory.filter(product => selectedBrands.includes(product.brand.name))
    : filteredByCategory;

  const currentProducts = filteredByBrand.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredByBrand.length / productsPerPage);

  const categories = [...new Set(products.map(product => product.category.name))];
  const brands = [...new Set(products.map(product => product.brand.name))];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      updatedBrands.splice(updatedBrands.indexOf(brand), 1);
    } else {
      updatedBrands.push(brand);
    }
    setSelectedBrands(updatedBrands);
  };

  return (
    <div className="container">
      <div className=' row product-block'>
        <div className='col-md-2'>
          <div className="sidebar">
            <div className="filter-group">
              <h4>Danh mục</h4>
              {categories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {' '}{category}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h4>Thương hiệu</h4>
              {brands.map(brand => (
                <label key={brand} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {' '}{brand}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className='col-md-10'>
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Thương hiệu</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.images[0].url} className='product-x-img' />
                      {product.name}
                    </td>
                    <td>{product.category.name}</td>
                    <td>{product.brand.name}</td>
                    <td>
                      <div className="button-container">
                        <button className="detail-button">Chi tiết</button>
                        <span>|</span>
                        <button className="delete-button">Xoá</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='row'>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
