import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './css/style.css';



const accessToken = sessionStorage.getItem('utoken');
let config = {};
if (accessToken) {
    // console.log('Bearer ' + accessToken.slice(1, -1));
    config = {
        headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) }
    };
}

function GetCategory(props) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8088/api/product/categories', config)
            .then(response => {
                setCategories(response.data.data);
                // console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const [categorySelectedId, setCategorySelectedId] = useState('');

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setCategorySelectedId(categoryId);
        props.onCategoryChange(categoryId);
    };
    return (
        <div >
            <select value={categorySelectedId} onChange={handleCategoryChange}>
                {categories.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export { GetCategory };
