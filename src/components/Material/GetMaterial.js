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

function GetMaterial(props) {
    const [materials, setMaterials] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8088/api/product/materials', config)
            .then(response => {
                setMaterials(response.data.data);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const [materialSelectedId, setMaterialSelectedId] = useState('');

    const handleMaterialChange = (event) => {
        const materialId = event.target.value;
        setMaterialSelectedId(materialId);
        props.onMaterialChange(materialId);
    };
    return (
        <div >
            <select value={materialSelectedId} onChange={handleMaterialChange}>
                {materials.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export { GetMaterial };
