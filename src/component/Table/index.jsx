import React, { useState, useEffect, useRef } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiSearch,
  FiFilter,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiLoader,
  FiAlertCircle,
  FiCheckCircle,
  FiDownload
} from 'react-icons/fi';
import { colors } from '../../variables/colors';
import Button from '../wrapper/Button';

import { generateInvoicePdf } from '../../utils/Invoice';
import { defaultStylesSidebar } from '../../constants/colors';

const Table = ({
  columns,
  data,
  pageSize: initialPageSize = 10,
  searchable = false,
  filterable = false,
  striped = false,
  hoverable = true,
  className = '',
  height = '95vh',
  maxHeight = '100vh',
  loading = false,
  showRowNumbers = true,
  compact = false,
  title = ""
}) => {
console.log(data, "data")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tableBodyRef = useRef(null);

  const totalPages = Math.ceil(data.length / pageSize);

  // Enhanced filtering with debounce effect
  const processedData = data
    .filter(item => {
      if (searchTerm) {
        const matchesSearch = columns.some(column => {
          const value = item[column.key];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
        if (!matchesSearch) return false;
      }
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = item[key];
        return itemValue && itemValue.toString().toLowerCase().includes(value.toLowerCase());
      });
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const currentData = processedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      if (tableBodyRef.current) {
        tableBodyRef.current.scrollTop = 0;
      }
    }
  };

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    // Add sort animation feedback
    const sortEvent = new CustomEvent('sortAnimation', { detail: { key, direction } });
    window.dispatchEvent(sortEvent);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setActiveFilters(prev => ({ ...prev, [key]: value ? true : false }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({});
    setActiveFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleScroll = (e) => {
    setScrolled(e.target.scrollTop > 10);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, pageSize]);

  // Add scroll listener
  useEffect(() => {
    const tableBody = tableBodyRef.current;
    if (tableBody) {
      tableBody.addEventListener('scroll', handleScroll);
      return () => tableBody.removeEventListener('scroll', handleScroll);
    }
  }, []);


  const handleExportExcel = () => {
     const order = {
    billNumber: "DNTG/000012/25-26",
    name: "newOne",
    userId: "DNT9215",
    phone: 9122038950,
    productName: "laptop",
    quantity: 2,
    dp: 500,
    cgstRate: 2,
    sgstRate: 2,
    igstRate: 10,
    tdsRate: 3,
    maintenanceRate: 2,
    shippingCharge: 10,
    netAmount: 1220,
    status: "approved",
    date: "2025-09-29T13:42:15.548Z",
  };
   generateInvoicePdf(order)
    console.log('Exporting to Excel...');
  };

  return (
    <div
      className={`table-container bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl ${className}`}
      style={{
        height,
        maxHeight,
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}
    >
      {/* Enhanced Search + Filter Header */}
     {(searchable || filterable || title) && (
  <div
    className={`p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white transition-all duration-300 ${
      scrolled ? "shadow-lg" : "shadow-sm"
    } flex flex-wrap md:flex-nowrap items-center justify-between gap-4 flex-shrink-0`}
  >
    {/* Title */}
    {title && (
      <h2 className="text-2xl font-bold tracking-tight   flex-shrink-0 text-black">
        {title}
      </h2>
    )}

    {/* Search */}
    {searchable ? (
      <div className="relative flex-1 max-w-md w-full">
        <div className="relative group">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-focus-within:text-blue-500" />
          <input
            type="text"
            placeholder="Search across all columns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>
    ) : (
      <div className="flex-1" />
    )}

    {/* Filters & Actions */}
    {filterable && (
      <div className="flex items-center gap-3 flex-shrink-0">
        {Object.values(activeFilters).filter(Boolean).length > 0 && (
          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold animate-pulse">
            {Object.values(activeFilters).filter(Boolean).length} Active
          </span>
        )}

        {/* <CustomButton
          textColor="white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExportExcel}
          className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
        >
          <FiDownload size={18} />
        </CustomButton> */}

        <button
          onClick={() => setShowFilterSidebar(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group"
          style={{
            borderColor: defaultStylesSidebar.cardbg,
            color: defaultStylesSidebar.cardbg,
            transform: "translateZ(0)",
          }}
        >
          <FiFilter className="transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold">Filters</span>
        </button>
      </div>
    )}
  </div>
)}



      {/* Enhanced Table Stats */}
      <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center justify-between text-sm text-gray-600 font-medium flex-shrink-0">
        {/* <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <FiCheckCircle className="text-green-500" />
            Total Records: <strong className="text-gray-800">{data.length}</strong>
          </span>
          {searchTerm || Object.values(filters).some(Boolean) ? (
            <span className="flex items-center gap-2 animate-fade-in">
              <FiFilter className="text-blue-500" />
              Filtered: <strong className="text-gray-800">{processedData.length}</strong>
            </span>
          ) : null}
        </div> */}



        {loading && (
          <div className="flex items-center gap-2 text-blue-600 animate-pulse">
            <FiLoader className="animate-spin" />
            Loading...
          </div>
        )}
      </div>

      {/* Enhanced Scrollable Table Container */}
      <div
        ref={tableBodyRef}
        className="flex-1 overflow-auto scroll-smooth custom-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="min-w-full animate-fade-in">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-20 transition-all duration-300">
              <tr className="relative">
                {showRowNumbers && (
                  <th className="px-6 py-4 text-left text-sm font-black tracking-wider text-gray-700 border-b border-gray-200 sticky left-0 bg-inherit z-10 transition-all duration-200 hover:bg-gray-200/50">
                    <div className="flex items-center gap-2">
                      <span>#</span>
                    </div>
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => column.sortable && handleSort(column.key)}
                    className={`px-6 py-4 text-left text-sm font-black tracking-wider cursor-pointer border-b border-gray-200 transition-all duration-200 group relative ${column.sortable ? "hover:bg-gray-200/50" : ""
                      } ${sortConfig.key === column.key ? 'bg-blue-50/50' : ''}`}
                    style={{
                      color: defaultStylesSidebar.cardbg,
                      width: column.width || 'auto',
                      minWidth: column.minWidth || '150px'
                    }}
                    
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {column.icon && <column.icon size={16} />}
                        {column.title}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {column.sortable && (
                          <>
                            {sortConfig.key === column.key ? (
                              sortConfig.direction === "asc" ? (
                                <FiArrowUp size={16} className="text-blue-500 animate-bounce" />
                              ) : (
                                <FiArrowDown size={16} className="text-blue-500 animate-bounce" />
                              )
                            ) : (
                              <div className="flex flex-col opacity-50">
                                <FiArrowUp size={12} />
                                <FiArrowDown size={12} className="-mt-1" />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {/* Sort indicator bar */}
                    {sortConfig.key === column.key && (
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${sortConfig.direction === 'asc' ? 'from-green-400 to-blue-500' : 'from-purple-400 to-pink-500'} animate-pulse`} style={{ width: '100%' }} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100/50">
              {loading ? (
                // Enhanced Loading State
                <tr>
                  <td colSpan={columns.length + (showRowNumbers ? 1 : 0)} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="relative">
                        <FiLoader className="text-blue-500 animate-spin text-4xl" />
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20"></div>
                      </div>
                      <div className="text-gray-600">
                        <p className="font-semibold text-lg">Loading data...</p>
                        <p className="text-sm mt-1">Please wait while we fetch your records</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : currentData.length > 0 ? (
                currentData.map((row, index) => (
                  <tr
                    key={index}
                    className={`animate-fade-in-up ${striped && index % 2 === 0 ? "bg-gray-50/30" : "bg-white"} ${hoverable ? "hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 hover:shadow-inner" : ""
                      } transition-all duration-300 ease-out transform hover:scale-[1.002] hover:-translate-y-0.5 border-l-4 border-l-transparent hover:border-l-blue-400`}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {showRowNumbers && (
                      <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-900 sticky left-0 bg-inherit z-5 transition-all duration-200">
                        <span className="bg-gradient-to-br from-gray-100 to-gray-200 px-3 py-1 rounded-full text-sm font-black">
                          {(currentPage - 1) * pageSize + index + 1}
                        </span>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 whitespace-nowrap text-base text-gray-800 font-medium transition-all duration-200 group relative"
                        style={{ width: column.width || 'auto' }}
                      >
                        <div className="flex items-center gap-3">
                          {column.render ? column.render(row[column.key], row) : row[column.key]}
                        </div>
                        {/* Hover effect line */}
                        <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full group-hover:left-0 transform -translate-x-1/2 group-hover:translate-x-0" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                // Enhanced Empty State
                <tr>
                  <td colSpan={columns.length + (showRowNumbers ? 1 : 0)} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
                      <div className="relative">
                        <FiAlertCircle className="text-gray-300 text-6xl" />
                        <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse opacity-50"></div>
                      </div>
                      <div className="text-gray-500">
                        <p className="font-bold text-xl mb-2">No records found</p>
                        <p className="text-sm">Try adjusting your search criteria or filters</p>
                        {(searchTerm || Object.values(filters).some(Boolean)) && (
                          <button
                            onClick={clearAllFilters}
                            className="mt-3 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg text-gray-700 font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0 animate-slide-up">
          <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <span>Showing</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-black">
              {(currentPage - 1) * pageSize + 1}
            </span>
            <span>to</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-black">
              {Math.min(currentPage * pageSize, processedData.length)}
            </span>
            <span>of</span>
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md font-black animate-pulse">
              {processedData.length}
            </span>
            <span>results</span>
          </div>

          {/* Page Size Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Rows per page:</span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white"
            >
              {[5, 10, 20, 50, 100].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* Enhanced Page Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full border-2 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95 group"
              style={{ borderColor: colors.theme1 }}
              title="First Page"
            >
              <FiChevronsLeft size={18} className="group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full border-2 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95 group"
              style={{ borderColor: colors.theme1 }}
              title="Previous Page"
            >
              <FiChevronLeft size={18} className="group-hover:text-blue-600 transition-colors" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2 mx-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-black transition-all duration-300 transform ${currentPage === pageNum
                      ? 'scale-110 shadow-lg ring-2 ring-blue-200'
                      : 'hover:scale-105 hover:shadow-md'
                      }`}
                    style={{
                      background: currentPage === pageNum
                        ? `linear-gradient(135deg, ${colors.theme1}, ${colors.theme2 || colors.theme1})`
                        : 'white',
                      borderColor: colors.theme1,
                      color: currentPage === pageNum ? 'white' : colors.theme1
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border-2 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95 group"
              style={{ borderColor: colors.theme1 }}
              title="Next Page"
            >
              <FiChevronRight size={18} className="group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border-2 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 active:scale-95 group"
              style={{ borderColor: colors.theme1 }}
              title="Last Page"
            >
              <FiChevronsRight size={18} className="group-hover:text-blue-600 transition-colors" />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Filter Sidebar */}
      {showFilterSidebar && (
        <div className="fixed inset-0 flex z-50 animate-fade-in">
          <div
            className="flex-1  bg-opacity-50 backdrop-blur-[0px] transition-all duration-300"
            onClick={() => setShowFilterSidebar(false)}
          ></div>
          <div className="w-96 bg-gradient-to-b from-white to-gray-50 h-full shadow-2xl p-6 flex flex-col animate-slide-in-left">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">

              <button
                onClick={() => setShowFilterSidebar(false)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110"
              >
                <FiX size={24} className="text-gray-600 hover:text-red-500 transition-colors" />
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar">
              {columns.filter(col => col.filterable).map(column => (
                <div key={column.key} className="relative group">
                  <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-wide">
                    {column.title}
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                    <input
                      type="text"
                      placeholder={`Type to filter ${column.title.toLowerCase()}...`}
                      value={filters[column.key] || ''}
                      onChange={e => handleFilterChange(column.key, e.target.value)}
                      className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl text-gray-900 text-sm font-semibold focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white/80"
                    />
                    {filters[column.key] && (
                      <button
                        onClick={() => handleFilterChange(column.key, '')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between gap-3 pt-6 border-t border-gray-200">
              <Button
                title=' Clear All'
                onClick={clearAllFilters}
              />
              <Button
                title=' Apply Filters'
                onClick={() => setShowFilterSidebar(false)}
              />

            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        .table-container {
          transform: translateZ(0);
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, ${colors.theme1}, ${colors.theme2 || colors.theme1});
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, ${colors.theme2 || colors.theme1}, ${colors.theme1});
        }
      `}</style>
    </div>
  );
};

export default Table;