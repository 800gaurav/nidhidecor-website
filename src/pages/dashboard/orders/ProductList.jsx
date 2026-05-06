import React, { useEffect, useState } from 'react';
import { Card, Image, Button, Input, Select, message, Badge, Spin } from 'antd';
import {
  FiShoppingBag,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiShoppingCart,
  FiZap,
  FiPackage,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import useApi from '../../../hooks/useApi';
import useAxios from '../../../utils/useAxios';
import { imageUrl } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { defaultStylesSidebar } from '../../../constants/colors';

const { Search } = Input;
const { Option } = Select;

const ProductList = () => {
  const { loading, fetchData } = useAxios();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [addingToCart, setAddingToCart] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const { getAllProducts, products } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetchData({
        url: '/api/v1/user/cart',
        method: 'GET',
      });
      if (res?.success) {
        setCartItems(res.data.items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const calculateDiscount = (mrp, dp) => {
    return Math.round(((mrp - dp) / mrp) * 100);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const handleCart = async (product) => {
    setAddingToCart((prev) => ({ ...prev, [product._id]: true }));
    try {
      const res = await fetchData({
        url: '/api/v1/user/cart/add',
        method: 'POST',
        data: { productId: product._id },
      });

      if (res?.success) {
        message.success('Added to cart!');
        fetchCart();
      }
    } catch (err) {
      message.error('Failed to add product');
    } finally {
      setAddingToCart((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  const handleBuyNow = (product) => {
    handleCart(product);
    navigate(`/dashboard/new-order?productId=${product._id}`);
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item._id === productId);

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
  <Card
  className="h-full border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 bg-white rounded-lg overflow-hidden"
 cover={
  <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden p-4">
    <div className="w-full h-[220px] flex items-center justify-center">
      {product.image ? (
        <img
          src={imageUrl(product.image)}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <FiPackage className="text-gray-300 text-4xl" />
      )}
    </div>

    {product.mrp > product.dp && (
      <div className="absolute top-2 right-2">
        <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
          {calculateDiscount(product.mrp, product.dp)}% OFF
        </span>
      </div>
    )}
  </div>
}


      >
        <div className="space-y-3">
          <div>
            <h3 className="font-medium text-gray-800 text-base mb-1 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-gray-900">
                ₹{product.dp.toLocaleString()}
              </span>
              {product.mrp > product.dp && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}
            </div>
            {product.mrp > product.dp && (
              <div className="text-xs text-green-600 font-medium">
                Save ₹{(product.mrp - product.dp).toLocaleString()}
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500">
            SP: <span className="font-medium">{product.sp}</span>
          </div>

          <div className="flex gap-5 pt-2">
            <Button
              onClick={() => handleCart(product)}
              disabled={addingToCart[product._id] || isInCart(product._id)}
              block
              className="h-9"
            >
              {isInCart(product._id)
                ? 'In Cart'
                : addingToCart[product._id]
                ? 'Adding...'
                : 'Add to Cart'}
            </Button>
            <Button
              style={{background: defaultStylesSidebar.cardbg, color: defaultStylesSidebar.text}}
              onClick={() => handleBuyNow(product)}
              className="h-9"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Products
          </h1>
          <p className="text-gray-600">
            Browse our collection of quality products
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Search
                placeholder="Search products..."
                prefix={<FiSearch className="text-gray-400" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                size="large"
              />
            </div>
            
            <div className="flex gap-4">
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                size="large"
                className="min-w-[180px]"
                suffixIcon={<FiFilter />}
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </Option>
                ))}
              </Select>

              <Badge count={cartItems.length} offset={[-5, 5]}>
                <Button
                  icon={<FiShoppingCart />}
                  onClick={() => navigate('/dashboard/new-order')}
                  size="large"
                >
                  Cart
                </Button>
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
            </div>
            
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                type={viewMode === 'grid' ? 'primary' : 'text'}
                icon={<FiGrid />}
                onClick={() => setViewMode('grid')}
                className="rounded-none border-0"
              />
              <Button
                type={viewMode === 'list' ? 'primary' : 'text'}
                icon={<FiList />}
                onClick={() => setViewMode('list')}
                className="rounded-none border-0"
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div
          className={`grid ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          } gap-6`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;