import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux store
  const {cartItems}=useSelector((state)=>state.cart);

  // const cartItems = 3; // Replace this with dynamic data

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${keyword}`);
  };

  const [logoutUser]=useLogoutUserMutation();

  const logoutHandler=async ()=>{
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate("/login");
      toast.success("logged out")
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }
  

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-xl font-bold">Logo</div>

        {/* Hamburger Menu (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation & Search (Desktop) */}
        <nav className={`lg:flex lg:items-center space-x-6 hidden`}>
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/shop" className="hover:text-gray-300">Shop</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:block relative">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-gray-800 text-sm text-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <button type="submit">
              <Search size={18} className="absolute top-2.5 right-3 text-gray-500" />
            </button>
          </form>
        </div>

        {/* Cart and Profile Section */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} className="hover:text-gray-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          {userInfo ? (
            // Logged-in user dropdown
            <div className="relative group">
              <div className="flex items-center space-x-2 cursor-pointer">
                <User size={24} className="hover:text-gray-300" />
                <span className="text-gray-300">{userInfo.name}</span>
              </div>

              {userInfo.role==="admin" && (
                  <div className="absolute z-50 right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to="/admin" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                    <Link onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-700">Logout</Link>
                  </div>
              )}
              {
                userInfo.role==="user" && (
                  <div className="absolute z-50 right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                  <Link onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-700">Logout</Link>
                </div>
                )
              }
             
            </div>
          ) : (
            // Guest user dropdown
            <div className="relative group">
              <User size={24} className="hover:text-gray-300 cursor-pointer" />
              <div className="absolute z-50 right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
                <Link to="/register" className="block px-4 py-2 hover:bg-gray-700">Register</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-800 text-white space-y-2 p-4">
          <Link to="/" className="block hover:text-gray-300">Home</Link>
          <Link to="/shop" className="block hover:text-gray-300">Shop</Link>
          <Link to="/about" className="block hover:text-gray-300">About</Link>
          <Link to="/contact" className="block hover:text-gray-300">Contact</Link>
          <div className="relative mt-4">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-gray-700 text-sm text-gray-300 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button type="submit">
                <Search size={18} className="absolute top-2.5 left-3 text-gray-500" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};