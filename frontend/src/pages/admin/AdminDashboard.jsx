import { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  CubeIcon,
  ShoppingCartIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid';
import ProductListingPage from './products/ProductListingPage';
import CreateProductPage from './products/CreateProductPage';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [metrics, setMetrics] = useState({
    sales: '32,450',
    orders: '1,234',
    users: '2,345',
    products: '543'
  });

  const navigation = [
    { name: 'Dashboard', icon: ChartBarIcon, section: 'dashboard' },
    { name: 'Products', icon: CubeIcon, section: 'products' },
    { name: 'Orders', icon: ShoppingCartIcon, section: 'orders' },
    { name: 'Users', icon: UsersIcon, section: 'users' },
    { name: 'Settings', icon: Cog6ToothIcon, section: 'settings' },
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="bg-gray-800 p-6 rounded-xl hover:transform hover:scale-105 transition-all">
                <h3 className="text-gray-400 text-sm uppercase">{key}</h3>
                <p className="text-3xl font-bold mt-2">{value}</p>
              </div>
            ))}
          </div>
        );
      // Add other cases for different sections
      case 'products':
        return <ProductListingPage />
      
      case 'create_product':
        return <CreateProductPage/>

    
      default:
        return <div>Section content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className={`bg-gray-800 ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 fixed h-screen z-50`}>
        <nav className="p-4">
          <div className={`mb-8 ${isCollapsed ? 'hidden' : 'block'}`}>
            <h1 className="text-2xl font-bold">AdminPanel</h1>
          </div>
          
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => setActiveSection(item.section)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                    activeSection === item.section 
                      ? 'bg-gray-700 text-white' 
                      : 'hover:bg-gray-700/50 text-gray-300'
                  }`}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className={`${isCollapsed ? 'hidden' : 'block'}`}>
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            {/* Add header content here */}
            {
              activeSection==="products" && (
                <button
                  onClick={() => setActiveSection('create_product')}
                  className="p-2 bg-blue-500 rounded-lg hover:bg-blue-700"
                >
                  Add Product
                </button>
              )
            }
            
          </div>
        </div>
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;