import { useState, useEffect } from 'react';
import { useFetchSingleProductQuery, useUpdateProductMutation } from '../../../slices/productsApiSlice';
import { Loader } from '../../../components/main';
import { useGetAllCategoriesQuery } from '../../../slices/categoryApiSlice';
import {toast} from "react-toastify";
const UpdateProductModal = ({ productId, setIsOpenModal,refetch }) => {
  const { data: productData, isLoading } = useFetchSingleProductQuery(productId);
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [updateProduct,{isLoading:updateLoading}]=useUpdateProductMutation();

  // Initializing product state only once when data is fetched
  const [product, setProduct] = useState({
    name: '',
    image: null,
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  useEffect(() => {
    if (productData) {
      setProduct({
        name: productData.name,
        image: productData.image,
        category: productData.category._id, // Assuming category is an object
        price: productData.price,
        stock: productData.stock,
        description: productData.description,
      });
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // onSave(product); Implement save logic
    console.log(productData._id);
    const formData=new FormData();
    formData.append('name',product.name);
    formData.append('price',product.price);
    formData.append('stock',product.stock);
    formData.append('description',product.description);
    formData.append('category',product.category); // Assuming category is an object id
    // if (product.image) {  // Only append image if it's selected
    //   formData.append("image", product.image);
    // }

    try{
      const res=await updateProduct({id:productData._id,formData}).unwrap();
      console.log(res);
      toast.success("Product updated successfully");
      setIsOpenModal(false);
      refetch();
    }catch(error){
      toast.error(error?.data?.message)
    }
  };

  if (isLoading || categoriesLoading) return <Loader />;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg p-6 transform transition-transform duration-300">
        <h2 className="text-2xl font-semibold mb-4 text-white">Update Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Product Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-600 rounded-md bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Stock Quantity */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-300">Stock Quantity</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              min="0"
              required
              className="mt-1 block w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsOpenModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
