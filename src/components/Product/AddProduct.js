import React, { useState, useEffect } from 'react';
import { GetCategory } from '../Category/GetCategory';
import { GetBrand } from '../Brand/GetBrand';
import { GetMaterial } from '../Material/GetMaterial';
import { GetDiscount } from '../Discount/GetDiscount';
import './css/addProduct.css';
import { storage } from "../../firebase";
import { v4 } from "uuid";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        brandId: '',
        categoryId: '',
        materialId: '',
        discountId: '',
        price: 0,
        description: '',
        images: [],
    });

    const [imageUrls, setImageUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

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

    const uploadFile = async () => {
        const tempUrls = [];
        for (let i = 0; i < product.images.length; i++) {
            const image = product.images[i];
            const storageRef = ref(storage, `images/${v4() + image.name}`);
            try {
                const snapshot = await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(snapshot.ref);
                tempUrls.push(downloadURL);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        setImageUrls(tempUrls);
        setIsUploading(true);
    };

    const handleBrandChange = (brandId) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            brandId: brandId,
        }));
    };

    const handleCategoryChange = (categoryId) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            categoryId: categoryId,
        }));
    };

    const handleDiscountChange = (discountId) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            discountId: discountId,
        }));
    };

    const handleMaterialChange = (materialId) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            materialId: materialId,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await uploadFile();
    };

    useEffect(() => {
        const newProduct = {
            name: product.name,
            brandId: product.brandId,
            categoryId: product.categoryId,
            materialId: product.materialId,
            discountId: product.discountId,
            price: product.price,
            description: product.description,
            images: imageUrls,
        };
        console.log(newProduct);
    }, [imageUrls]);


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
                            <GetBrand onBrandChange={handleBrandChange}></GetBrand>
                        </div>
                        <div>
                            <label htmlFor="category">Danh mục:</label>
                            <GetCategory onCategoryChange={handleCategoryChange} ></GetCategory>
                        </div>
                        <div>
                            <label htmlFor="material">Chất liệu:</label>
                            <GetMaterial onMaterialChange={handleMaterialChange}></GetMaterial>
                        </div>
                        <div>
                            <label htmlFor="discount">Ưu đãi:</label>
                            <GetDiscount onDiscountChange={handleDiscountChange}></GetDiscount>
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
                        <button type="submit" onClick={handleSubmit}>Thêm</button>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
