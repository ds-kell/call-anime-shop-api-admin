import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import './css/style.css'
const accessToken = sessionStorage.getItem('utoken');
let config = {

};
if (accessToken) {
    config = {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) }
    };
}

function GetOrder() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.post('http://localhost:8088/api/user/order/custom-bills', config)
            .then(response => {
                setOrders(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleConfirm = (orderId) => {
        // Xử lý khi nhấn nút "Xác nhận"
        console.log("Đã xác nhận đơn hàng", orderId);
    }

    const handleViewDetails = (orderId) => {
        // Xử lý khi nhấn nút "Xem chi tiết"
        console.log("Xem chi tiết đơn hàng", orderId);
    }


    // Sử dụng component OrderTable

    return (
        <div className='container'>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Phương thức thanh toán</th>
                        <th>Địa chỉ giao hàng</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>
                                {order.productBills.map((productBill) => (
                                    <div key={productBill.id}>{productBill.productDetail.productDto.name}</div>
                                ))}
                            </td>
                            <td>
                                {order.productBills.map((productBill) => (
                                    <div key={productBill.id}>{productBill.quantity}</div>
                                ))}
                            </td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.deliveryAddressDto.province}, {order.deliveryAddressDto.district}, {order.deliveryAddressDto.ward}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className='confirm-btn' onClick={handleConfirm(order.id)}>Xác nhận</button>
                                <button className='details-btn' onClick={handleViewDetails(order.id)}>Xem chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export { GetOrder };