import React, { useState } from 'react';
import AddToCart from '../Cart/AddToCart';
const SizeAndPrice = ({ productDetails }) => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [messageQuantity, setMessageQuantity] = useState("")
    const [selectedProductDetailId, setSelectedProductDetailId] = useState(null);
    const handleSizeClick = (size, price, discount, countInStock, productDetailId) => {
        setSelectedSize(size);
        setSelectedPrice(price);
        setDiscountPrice(discount)
        setAvailableQuantity(countInStock);
        setMessageQuantity("")
        setSelectedProductDetailId(productDetailId)

    };
    function handleQuantityChange(event) {
        const value = event.target.value;
        if (value <= availableQuantity) {
            setQuantity(value);

        } else {
            setQuantity(availableQuantity);
        }

        if (value >= availableQuantity) {
            setMessageQuantity("Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này")
        }
        if (value < availableQuantity) {
            setMessageQuantity("")
        }
    }
    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
        if (quantity < availableQuantity) {
            setMessageQuantity("")
        }
    };

    const increaseQuantity = () => {
        if (quantity < availableQuantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
        if (quantity == availableQuantity) {
            setMessageQuantity("Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này")
        }
    };
    const total = productDetails.reduce((count, product) => count + product.countInStock, 0);
    const [availableQuantity, setAvailableQuantity] = useState(total);
    return (
        <div>
            <div className='row'>
                <div className='col-sm-3'>Kích thước: </div>
                <div className='col-sm-8'>
                    <div className="size-container" >
                        {productDetails.map((product) => (
                            <div key={product.id} className="size-item" onClick={() =>{
                                handleSizeClick(
                                    product.size.value,
                                    product.price,
                                    (product.price - product.price * product.productDto.discount.value / 100) || product.price,
                                    product.countInStock || 0,
                                    product.id
                                ); 
                            }
                            }
                            >
                                <div>
                                    {product.size.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='row price-size'>
                <div className='col-sm-3'>
                    <p>Giá gốc:</p>
                    <p>Giá ưu đãi:</p>
                </div>
                <div className='col-sm-8'>
                    <div>
                        {selectedSize && selectedPrice && (
                            <div>
                                <del>{selectedPrice}₫</del>
                                <p>{discountPrice}₫</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='quantity'>
                <div className='row'>
                    <div className='col-sm-3'>
                        Số lượng:
                    </div>
                    <div className='col-sm-4'>
                        <button onClick={decreaseQuantity} className='btn-quantity'>-</button>
                        <input
                            type="number"
                            min="1"
                            max={availableQuantity}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className='input-quantity'
                        />
                        <button onClick={increaseQuantity} className='btn-quantity'>+</button>
                    </div>
                    <div className='col-sm-4'>
                        <p>{availableQuantity} sản phẩm có sẵn</p>
                    </div>
                    <div className='row'>
                        <p className='message-quantity'>{messageQuantity}</p>
                    </div>
                </div>
            </div>
            <div>
                <AddToCart productDetailId={selectedProductDetailId} quantity={quantity} />
            </div>
        </div>
    );
};
export default SizeAndPrice;
