import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { CartPage, CheckoutPage, HomePage, LoginPage, ProductListingPage, ProfilePage, RegisterPage } from '../pages/main'
import PrivateRoutes from './PrivateRoutes'
import { OrderDetailPage } from '../pages/orders/OrderDetailPage'
import AdminRoutes from './AdminRoutes'
import AdminDashboard from '../pages/admin/AdminDashboard'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/shop" element={<ProductListingPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegisterPage/>}></Route>

            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path='/checkout' element={<CheckoutPage/>}></Route>
            <Route path="/profile" element={<PrivateRoutes><ProfilePage/></PrivateRoutes>}></Route>
            <Route path="/orders/:id" element={<PrivateRoutes><OrderDetailPage/></PrivateRoutes>}></Route>


            {/* admin routes */}

            <Route path='/admin' element={<AdminRoutes><AdminDashboard/></AdminRoutes>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes