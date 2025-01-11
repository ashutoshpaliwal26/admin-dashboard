import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, X } from 'lucide-react';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'iPhone 14 Pro Max',
      category: 'Electronics',
      price: 1099.00,
      stock: 45,
      status: 'In Stock',
    },
    {
      id: '2',
      name: 'MacBook Pro 16"',
      category: 'Electronics',
      price: 2499.00,
      stock: 12,
      status: 'Low Stock',
    },
    {
      id: '3',
      name: 'AirPods Pro',
      category: 'Accessories',
      price: 249.00,
      stock: 0,
      status: 'Out of Stock',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  
  const { showToast } = useToast();

  // Real-time search
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    if (selectedStatus.length > 0) {
      filtered = filtered.filter(product => selectedStatus.includes(product.status));
    }

    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= Number(priceRange.min));
    }

    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= Number(priceRange.max));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategories, selectedStatus, priceRange, products]);

  const handleAddProduct = (formData: FormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      status: Number(formData.get('stock')) === 0 
        ? 'Out of Stock' 
        : Number(formData.get('stock')) <= 10 
          ? 'Low Stock' 
          : 'In Stock',
    };

    setProducts(prev => [...prev, newProduct]);
    setIsAddProductModalOpen(false);
    showToast('Product added successfully', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-500/10 text-green-500';
      case 'Low Stock':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'Out of Stock':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category)));
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-[#0F1631] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Product</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Category</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Price</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Stock</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{product.name}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{product.category}</td>
                  <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-4">{product.stock}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        title="Add New Product"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct(new FormData(e.currentTarget));
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Product Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category
              </label>
              <input
                name="category"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Price
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                required
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsAddProductModalOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Products"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories(prev => [...prev, category]);
                      } else {
                        setSelectedCategories(prev => prev.filter(c => c !== category));
                      }
                    }}
                    className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-700 rounded focus:ring-purple-600"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Status</h3>
            <div className="space-y-2">
              {statuses.map(status => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStatus(prev => [...prev, status]);
                      } else {
                        setSelectedStatus(prev => prev.filter(s => s !== status));
                      }
                    }}
                    className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-700 rounded focus:ring-purple-600"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Price Range</h3>
            <div className="flex gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-1 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-1 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedStatus([]);
                setPriceRange({ min: '', max: '' });
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Products;