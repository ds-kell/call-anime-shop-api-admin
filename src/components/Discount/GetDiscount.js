import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './css/style.css';



const accessToken = sessionStorage.getItem('utoken');
let config = {};
if (accessToken) {
    console.log('Bearer ' + accessToken.slice(1, -1));
    config = {
        headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) }
    };
}

function GetDiscount(props) {
    const [discounts, setDiscounts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8088/api/product/discounts', config)
            .then(response => {
                setDiscounts(response.data.data);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const [discountSelectedId, setDiscountSelectedId] = useState('');

    const handleDiscountChange = (event) => {
        const discountId = event.target.value;
        setDiscountSelectedId(discountId);
        props.onDiscountChange(discountId);
    };
    return (
        <div >
            <select value={discountSelectedId} onChange={handleDiscountChange}>
                {discounts.map(item => (
                    <option key={item.id} value={item.id}>{item.name} | -{item.value}%</option>
                ))}
            </select>
        </div>
    );
}

export { GetDiscount };
