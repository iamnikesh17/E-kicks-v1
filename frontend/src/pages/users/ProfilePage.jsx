import React,{useState,useEffect} from 'react';
import { toast } from 'react-toastify';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '../../slices/usersApiSlice';
import { Loader } from '../../components/main';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { Link } from 'react-router-dom';


export const ProfilePage = () => {
    const [isEdit,setIsEdit]=useState(false);
    
    const [updateProfile,{isLoading:updateProfileLoading}]=useUpdateProfileMutation();
    const {data:userInfo,isLoading,error,refetch}=useGetUserProfileQuery();
    const {data:orders,isLoading:ordersLoading}=useGetMyOrdersQuery();


    useEffect(()=>{
        if(userInfo){
            setFormData({
                name:userInfo.name,
                email: userInfo.email
            })
        }
    },[userInfo])

    const [formData,setFormData]=useState({
        name:"",
        email: ""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const res=await updateProfile(formData).unwrap();
            console.log(res);
            toast.success("Profile updated successfully");
            refetch()

        } catch (error) {
            toast.error(error?.data?.message || error?.error)
        }
    }

    if(isLoading || ordersLoading){
        return <Loader/>
    }

    if(error){
        return <h1 className="text-3xl text-red-600 text-center">{error?.data?.message || error?.error}</h1>
    }




  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
    <div className="max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>

      {/* Profile Information Card */}

        {
            isEdit ? (
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-3 transition-transform duration-300 hover:-translate-y-2">
                <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                
                      className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
          
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                
                      className="mt-1 block w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
          
              
          
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
          
            ):(  <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-3 transition-transform duration-300 hover:-translate-y-2">
                <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Full Name</label>
                    <p className="mt-1 text-lg">{userInfo.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Email</label>
                    <p className="mt-1 text-lg">{userInfo.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Phone</label>
                    <p className="mt-1 text-lg">+1 (123) 456-7890</p>
                  </div>
                </div>
              </div>
              )
        }


    
      <button onClick={()=>setIsEdit((prev)=>!prev)} className="mb-10 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
            {isEdit?"View Profile":"Edit Profile"}
        </button>

      {/* Order History Card */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-transform duration-300 hover:-translate-y-2">
        <h2 className="text-2xl font-semibold mb-4">Order History</h2>
        <div className="space-y-4">
            {
                orders.length===0?(
                    <p className="text-lg text-gray-400">No orders found</p>
                ):(
                    orders.map((order)=>(
                        <div key={order._id} className="border-b border-gray-700 pb-4">
                            <p className="text-lg font-medium">Order #{order._id}</p>
                            <p className="text-sm text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-400">Total: ${order.totalPrice}</p>
                            <Link to={`/orders/${order._id}`}>
                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
                                    View Detail
                                </button>
                            </Link>
                        </div>
                    ))
                )
            }
       
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all duration-300">
            View All Orders
          </button>
        </div>
      </div>

    
    </div>
  </div>
  );
};


