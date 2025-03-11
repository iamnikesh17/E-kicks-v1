import { useState } from 'react';
import { useAdminFetchAllProductsQuery, useDeleteProductMutation } from '../../../slices/productsApiSlice';
import { Loader } from '../../../components/Elements/Loader';
import UpdateProductModal from './UpdateProductModal';
import {toast} from "react-toastify"

const ProductListingPage = ({setActiveSection}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal,setIsOpenModal]=useState(false)
  const [selectedProduct,setSelectedProduct]=useState(null);

  const { data, isLoading, error ,refetch} = useAdminFetchAllProductsQuery({ page: currentPage });
  const [deleteProduct,{isLoading:deleteLoading}]=useDeleteProductMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const editHandler=(id)=>{
    setIsOpenModal(true);
    setSelectedProduct(id);
  }


  const handleDelete=async (id)=>{
    try{
      await deleteProduct(id).unwrap();
      refetch();
      toast.success("Product deleted successfully");
    }catch(error){
      toast.error(error?.data?.message || error?.error)
    }
  }


  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="hidden md:table-header-group bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Product</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Stock</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200">
            {data?.products?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-800 transition-colors">
                {/* Mobile View */}
                <td className="md:hidden p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fHww"
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="space-y-1">
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-sm text-white">{product?.category?.name}</div>
                      <div className="text-lg font-semibold">${product.price}</div>
                    </div>
                  </div>
                </td>

                {/* Desktop View */}
                <td className="hidden md:table-cell px-4 py-3">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNob2VzfGVufDB8fDB8fHww"
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <span className="font-medium text-white">{product.name}</span>
                  </div>
                </td>

                <td className="hidden md:table-cell px-4 py-3 text-white">{product.category.name}</td>
                <td className="hidden md:table-cell px-4 py-3 font-semibold text-white">${product.price}</td>
                
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex space-x-3">
                    <button onClick={()=>editHandler(product._id)}  className="p-2 hover:bg-blue-100 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button onClick={()=>handleDelete(product._id)} className="p-2 hover:bg-red-100 rounded-full transition-colors">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center px-4">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {data.pages}
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          
          {Array.from({ length: data.pages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-3 py-1.5 rounded-md ${
                currentPage === pageNumber
                  ? 'bg-blue-600 text-white' 
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button 
            className="px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            disabled={currentPage === data.pages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {
        isOpenModal && (
          <UpdateProductModal productId={selectedProduct} setIsOpenModal={setIsOpenModal} refetch={refetch}/>
        )
      }
    </div>
  );
};

export default ProductListingPage;