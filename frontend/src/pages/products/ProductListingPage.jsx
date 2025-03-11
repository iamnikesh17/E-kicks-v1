import { useState, useMemo } from "react";
import { Loader, Pagination, ProductCard } from "../../components/main";
import { useGetAllProductsQuery } from "../../slices/productsApiSlice";
import { useGetAllCategoriesQuery } from "../../slices/categoryApiSlice";
import { useLocation } from "react-router-dom";

export const ProductListingPage = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const queryTerm = queryParams.get("q") || "";

  // Backend filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 100000000]);

  const { data, isLoading, error } = useGetAllProductsQuery({
    category: selectedCategory,
    rating: selectedRating,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    page: pageNumber,
    keyword: queryTerm,
  });

  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();

  const handleRemoveFilters = () => {
    setSelectedCategory("All");
    setSelectedRating(0);
    setPriceRange([0, 100000000]);
  };

  if (categoriesLoading || isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error?.data?.message || error?.error}</h1>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row">
        {/* Mobile Filters Toggle Button */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {mobileSidebarOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sidebar Filters */}
        <div
          className={`${
            mobileSidebarOpen ? "block" : "hidden"
          } lg:block lg:w-1/4 bg-gray-800 p-4 rounded-md mb-6 lg:mb-0`}
        >
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Category Filter */}
          <h3 className="font-semibold mb-2">Category</h3>
          <div className="flex flex-col space-y-2 mb-6">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`${
                selectedCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              } px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white`}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`${
                  selectedCategory === category._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                } px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Rating Filter */}
          <h3 className="font-semibold mb-2">Rating</h3>
          <div className="flex flex-col space-y-2 mb-6">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`${
                  selectedRating === rating
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                } px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white`}
              >
                {rating} Stars & Up
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 mb-2">Min Price:</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([parseInt(e.target.value), priceRange[1]])
              }
              className="mb-2"
            />
            <label className="text-gray-300 mb-2">Max Price:</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
            />
            <div className="text-gray-300 mt-2">
              ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>

          {/* Remove Filters Button */}
          <button
            onClick={handleRemoveFilters}
            className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-md transition-all duration-300 hover:bg-red-500"
          >
            Remove Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4 lg:ml-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.products.length > 0 ? (
              data?.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>

          {/* Pagination */}
          {data?.products.length > 0 && (
            <div className="mt-6 mx-auto flex justify-center flex-wrap">
              <button
                className="bg-gray-700 m-1 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white"
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              {Array.from({ length: data?.pages }, (_, index) => index + 1).map(
                (x) => (
                  <button
                    key={x}
                    onClick={() => setPageNumber(x)}
                    className={`m-1 ${
                      pageNumber === x
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300"
                    } px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white`}
                  >
                    {x}
                  </button>
                )
              )}
              <button
                className="bg-gray-700 m-1 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-500 hover:text-white"
                disabled={pageNumber === data?.pages}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};