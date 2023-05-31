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

function GetBrand(props) {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8088/api/product/brands', config)
            .then(response => {
                setBrands(response.data.data);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const [brandSelectedId, setBrandSelectedId] = useState('');

    const handleBrandChange = (event) => {
        const brandId = event.target.value;
        setBrandSelectedId(brandId);
        props.onBrandChange(brandId);
    };
    return (
        <div >
            <select value={brandSelectedId} onChange={handleBrandChange}>
                {brands.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export { GetBrand };
