import React, { useState } from 'react';
import { GetCategory } from '../Category/GetCategory';
import { GetBrand } from '../Brand/GetBrand';
import { GetMaterial } from '../Material/GetMaterial';
import { GetDiscount } from '../Discount/GetDiscount';
import './css/addProduct.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        images: [],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: files,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý logic thêm sản phẩm tại đây
        console.log('Sản phẩm được gửi đi:', product);
        // Reset form sau khi submit thành công
        setProduct({
            name: '',
            price: 0,
            description: '',
            images: [],
        });
    };

    return (
        <div className='container'>
            <div className="add-product-container">
                <center>
                    <h2>Thêm sản phẩm</h2>
                </center>
                <form onSubmit={handleSubmit} className='row'>
                    <div className='col-md-2'></div>
                    <div className='col-md-3'>
                        <div>
                            <label htmlFor="name">Tên sản phẩm:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="brand">Thương hiệu:</label>
                            <GetBrand></GetBrand>
                        </div>
                        <div>
                            <label htmlFor="category">Danh mục:</label>

                            <GetCategory></GetCategory>
                        </div>
                        <div>
                            <label htmlFor="discount">Ưu đãi:</label>

                            <GetDiscount></GetDiscount>
                        </div>
                        <div>
                            <label htmlFor="material">Chất liệu:</label>

                            <GetMaterial></GetMaterial>
                        </div>
                        <div>
                            <label htmlFor="price">Giá:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-3'>
                        <div>
                            <label htmlFor="description">Mô tả:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="images">Hình ảnh:</label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="image-preview">
                            {product.images.length > 0 ? (
                                product.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index + 1}`}
                                        className="preview-image"
                                    />
                                ))
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </div>
                    {/* <div className='col-md-2'></div> */}
                    <center>
                        <button type="submit">Thêm</button>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
