'use client';
import React, { lazy, useEffect, useState, useCallback, useMemo } from 'react';

const Product = lazy(() => import('@/components/product/Product'));

const ProductGrid = ({ selectedServings, selectedFlavors, categoryId, searchFilter }) => {
  const [products, setProducts] = useState([]);
  const initialOffset = 0;
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState(0);

  const apiUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_DATA_API}/getProducts?offset=${offset}&limit=10&filter=${searchFilter}&servings=${selectedServings}&category_id=${categoryId}&flavors=${JSON.stringify(selectedFlavors)}`;
  }, [offset, selectedFlavors, categoryId, selectedServings, searchFilter]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProducts(prev => (offset === 0 ? data.data.products : [...prev, ...data.data.products]));
      setHasMore(data.data.products.length === 10);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, offset]);

  useEffect(() => {
    setProducts([]);
    setOffset(initialOffset);
    fetchProducts();
  }, [fetchProducts, initialOffset]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setOffset(prevOffset => prevOffset + 10);
    }
  }, [loading, hasMore]);

  return (
    <div className='w-full pb-[60px]'>
      <div className='grid grid-cols-3 tablet:grid-cols-2 mobile:block gap-[20px]'>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card is-loading">
              <div className="image"></div>
              <div className="content">
                <h2></h2>
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">
            <h2 className='mt-[40px]'>No results found.</h2>
          </div>
        )}
      </div>
      {hasMore && !loading && (
        <button className='more_btn' onClick={loadMore}>Load More Products</button>
      )}
    </div>
  );
};

export default ProductGrid;
