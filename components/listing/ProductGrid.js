'use client';
import request from '@/utils/hooks/request';
import useDebounce from '@/utils/hooks/useDebounce';
import { useSearchParams } from 'next/navigation';
import React, { lazy, useEffect, useState, useMemo } from 'react';

const Product = lazy(() => import('@/components/product/Product'));

const ProductGrid = ({ filters }) => {

  const [listingData, setListingData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const subcategoryFromParams = filters.subcategory || searchParams.get('category');
  const searchFilter = searchParams.get('filter') || '';

  // Destructure filters
  const { finenessIds: selectedFlavors, subcategoryId: categoryId, typeId: selectedServings } = filters;
  
  const subcategory = categoryId || subcategoryFromParams;

  // Debounce filter changes
  const debouncedFilters = useDebounce({ offset, searchFilter, selectedServings, subcategory, selectedFlavors }, 300);

  // Construct API URL
  const apiUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_DATA_API}/getProducts?offset=${debouncedFilters.offset}&limit=${limit}&filter=${debouncedFilters.searchFilter}&servings=${debouncedFilters.selectedServings}&category_id=${debouncedFilters.subcategory || ''}&flavors=[${debouncedFilters.selectedFlavors}]`;
  }, [debouncedFilters]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await request(apiUrl);
      if (debouncedFilters.offset === 0) {
        // If offset is zero (first fetch), reset listingData
        setListingData(data?.data?.products || []);
      } else {
        // Otherwise append new products
        setListingData(prevData => [...prevData, ...(data?.data?.products || [])]);
      }
      setHasMore(data?.data?.products.length === limit);
    } catch (error) {
      console.error(error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch products based on debounced filters
  useEffect(() => {
    fetchProducts();
  }, [apiUrl]); // Only depend on apiUrl

  // Reset offset and listingData when filters change
  useEffect(() => {
    if (filters) {
      setOffset(0); // Reset offset
      setListingData([]); // Clear existing data
    }
  }, [filters]); // Only depend on filters

  const loadMoreProducts = () => {
    setOffset(prevOffset => prevOffset + limit);
  };


  return (
    <div className='w-full pl-[40px] laptopHorizontal:pl-0 pb-[60px] mobile:pl-0'>
      <div className='grid grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-x-[30px] gap-y-[30px]'>
        {loading && listingData.length === 0 ? (
          Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="card is-loading">
              <div className="image"></div>
              <div className="content">
                <h2></h2>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="error-message">
            <h2 className='mt-[40px]'>{error}</h2>
          </div>
        ) : listingData.length > 0 ? (
          listingData.map((product, index) => (
            <Product key={`${product.id}-${index}`} product={product} />
          ))
        ) : (
          <div className="no-results">
            <h2 className='mt-[40px]'>No results found.</h2>
          </div>
        )}
      </div>
      {hasMore && (
        <button
          className='more_btn uppercase'
          onClick={loadMoreProducts}
          disabled={loading}
        >
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="absolute inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              ></path>
            </svg>
          ) : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default ProductGrid;