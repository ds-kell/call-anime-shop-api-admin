import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactModal from 'react-modal';

import ProductImageGallery from './ProductImageGallery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SizeAndPrice from './SizeAndPrice';
import './css/productdetail.css'
const ProductDetail = () => {
  const [productDetails, setProductDetails] = useState([]);
  const { productId } = useParams();
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8088/api/products/${productId}`)
        .then(response => {
          setProductDetails(response.data.data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [productId]);
  // Tạo danh sách các URL
  const product = productDetails[0]; // Lấy phần tử đầu tiên từ danh sách

  const imageUrls = product && Array.isArray(product.productDto.images) ? product.productDto.images.map(image => image.url) : [];
  if (product && product.imageUrl) {
    imageUrls.push(product.imageUrl);
  }
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sizes = productDetails.map(product => product.size);
  const prices = productDetails.map(product => product.price);
  const countInStocks = productDetails.map(product => product.countInStock);



  const [filterRating, setFilterRating] = useState(0);
  const ProductCard = ({ name, rating }) => (
    <div className="product-card" data-rating={rating}>
      <h3>{name}</h3>
      <p>Rating: {rating} stars</p>
    </div>
  );
  const products = [
    { name: 'Product 1', rating: 5 },
    { name: 'Product 2', rating: 4 },
    { name: 'Product 3', rating: 3 },
    { name: 'Product 4', rating: 5 },
    { name: 'Product 5', rating: 2 },
  ];

  const filterByRating = (rating) => {
    setFilterRating(rating);
  };

  const showAllProducts = () => {
    setFilterRating(0);
  };


  return (
    <div className='container'>
      <div className='col-md-10 product-details'>
        <div className='row'>
          <div className='col-md-6'>
            {/* <ProductImageGallery imageUrls={imageUrls} /> */}
            <center>
              {imageUrls && imageUrls.length > 0 && (
                <div>
                  <Slider {...sliderSettings}>
                    {imageUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} alt={`Image ${index}`} className='product-details-images' />
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </center>
          </div>
          <div className='col-md-6'>
            <h3 className='product-detail-title' >CHI TIẾT SẢN PHẨM</h3>
            <div>
              {productDetails[0] && (
                <div>
                  <h5>{productDetails[0].productDto.name}</h5>
                  <p>{productDetails[0].productDto.description}</p>
                </div>
              )}
            </div>
            <div>
              <SizeAndPrice productDetails={productDetails} />
            </div>
          </div>
        </div>
      </div>
      <div className='row size-table'>
        <center>
          <h5>
            Bảng quy đổi kích cỡ cho áo
          </h5>
          <img src='https://hanghieusales.com/wp-content/uploads/2017/03/bang-quy-doi-ao-so-mi-nu.png' className='description-sizechart' />
          <h5>
            Bảng quy đổi kích cỡ cho chân váy và quần
          </h5>
          <img src='https://hanghieusales.com/wp-content/uploads/2017/03/bang-quy-doi-quan-nu.png' className='description-sizechart' />
        </center>
      </div>
      <div className='row product-rating-block'>
        <h4>
          Đánh giá sản phẩm
        </h4>
        <div>
          <div id="filter-buttons" className='product-rating'>
            <button className="filter-button" onClick={showAllProducts}>
              Show All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button key={rating} className="filter-button" onClick={() => filterByRating(rating)}>
                {rating} sao
              </button>
            ))}
          </div>
          <div className='content-ratting'>
            <center>
              <img src='https://thumbs.dreamstime.com/z/rating-icon-white-background-concept-favorite-consumer-service-86009222.jpg' className='rating-img' />
              <p>
                Chưa có đánh giá
              </p>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
