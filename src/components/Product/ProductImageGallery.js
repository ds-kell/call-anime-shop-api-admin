import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/product.css'
const ProductImageGallery = ({ imageUrls }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: currentSlide,
        afterChange: (slideIndex) => setCurrentSlide(slideIndex),
    };
    return (
        <div className="product-image-gallery">
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
    );
};

export default ProductImageGallery;
