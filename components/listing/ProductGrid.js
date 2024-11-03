'use client';
import React, { lazy, useEffect, useState } from 'react';

const Product = lazy(() => import('@/components/product/Product'));

const ProductGrid = ({ newOffset = 0, selectedFlavors, categoryId, searchFilter }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_DATA_API}/getProducts?offset=${newOffset}&limit=10&filter=${searchFilter}&category_id=${categoryId}&flavors=${JSON.stringify(selectedFlavors)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(prev => newOffset === 0 ? data.data.products : [...prev, ...data.data.products]);
      setHasMore(data.data.products.length === 10);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, [categoryId, searchFilter, selectedFlavors]);

  return (
    <div className='w-full pb-[60px]'>
      <div className='grid grid-cols-3 tablet:grid-cols-2 mobile:block gap-[20px]'>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
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
      {hasMore && (
        <button className='more_btn' onClick={() => loadMore()}>Load More Products</button>
      )}
    </div>
  );
};

export default ProductGrid;