import React from 'react';
import dayjs from 'dayjs'; // For date formatting
import { Loader } from '../../components/main';
import { useGetOrderByIdQuery } from '../../slices/ordersApiSlice';
import { useParams } from 'react-router-dom';

export const OrderDetailPage = () => {

    const {id}=useParams();
    const {data:orderData,isLoading}=useGetOrderByIdQuery(id);
    console.log(orderData);

    if(isLoading){
      return <Loader/>
    }


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        
        {/* Order Information Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <p><span className="font-bold">Order ID:</span> {orderData._id}</p>
          <p><span className="font-bold">User ID:</span> {orderData.user}</p>
        </div>

        {/* Items Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {orderData?.items?.map((item) => (
              <div key={item.product} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-all">
                <p><span className="font-bold">Product Name:</span> {item.name}</p>
                <p><span className="font-bold">Product ID:</span> {item.product}</p>
                <p><span className="font-bold">Price:</span> ${item.price}</p>
                <p><span className="font-bold">Quantity:</span> {item.qty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Pricing Summary</h2>
          <p><span className="font-bold">Items Price (Subtotal):</span> ${orderData.itemsPrice}</p>
          <p><span className="font-bold">Tax:</span> ${orderData.taxPrice.toLocaleString()}</p>
          <p><span className="font-bold">Shipping Price:</span> ${orderData.shippingPrice}</p>
          <p><span className="font-bold text-xl">Total Price:</span> ${orderData.totalPrice.toLocaleString()}</p>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <p><span className="font-bold">Address:</span> {orderData.shippingAddress.address}</p>
          <p><span className="font-bold">City:</span> {orderData.shippingAddress.city}</p>
          <p><span className="font-bold">Postal Code:</span> {orderData.shippingAddress.postalCode}</p>
          <p><span className="font-bold">Country:</span> {orderData.shippingAddress.country}</p>
        </div>

        {/* Order Status Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <p><span className="font-bold">Status:</span> {orderData.isDelivered ? 'Delivered' : 'Not Delivered'}</p>
        </div>

        {/* Timestamps Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Timestamps</h2>
          <p><span className="font-bold">Created At:</span> {dayjs(orderData.createdAt).format('MMMM D, YYYY h:mm A')}</p>
          <p><span className="font-bold">Last Updated At:</span> {dayjs(orderData.updatedAt).format('MMMM D, YYYY h:mm A')}</p>
        </div>
      </div>
    </div>
  );
};


