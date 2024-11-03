'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { lazy, useEffect, useState } from 'react';
import cover1 from "@/public/images/cover1.png";
import Image from 'next/image';
import IconChecked from '@/public/icons/IconChecked';

const Product = lazy(() => import('@/components/product/Product'));

const ProductGrid = ({ flavors, categories }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Initialize states
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    
    // Get categoryId and search filter directly from search params
    const categoryIdFromParams = searchParams.get('category') || '';
    const searchFilter = searchParams.get('filter') || '';
    
    // Local state for categoryId
    const [categoryId, setCategoryId] = useState(categoryIdFromParams);

    const fetchProducts = async (newOffset = 0) => {
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
    }, [categoryId, selectedFlavors]);

    // Change filter type
    const changeFilterType = (filter) => {
        setCategoryId(filter); // Update local state
        router.push(`?category=${filter}&filter=${searchFilter}`, { scroll: false }); 
    };

    // Change flavors type and refetch products
    const changeFlavorsType = (flavorId) => {
        setSelectedFlavors(prev => {
            const newSelectedFlavors = prev.includes(flavorId) ? prev.filter(id => id !== flavorId) : [...prev, flavorId];
            return newSelectedFlavors; // Update selected flavors
        });
    };

    return (
        <>
            <div className='bg-[#FFEED9] py-[50px] laptopHorizontal:py-[30px] tablet:py-[20px]'>
                <div className='custom_container !mt-[130px] mobile:!mt-[150px] text-[32px] laptopHorizontal:text-2xl laptop:text-xl tablet:text-base text-[#B62025] uppercase text-center'> Products </div>
            </div>
            <div className='cover_bg w-full'>
                <Image src={cover1} alt="Cover image" priority={true} unoptimized={true} sizes="90vw" style={{ objectFit: "cover" }} />
            </div>
            <div className='cover_container flex laptop:block gap-[25px] !mt-[70px] laptop:!mt-[40px] laptopHorizontal:gap-20'>
                <div className='filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] laptop:max-w-none laptopHorizontal:max-w-[230px] laptopHorizontal:p-[15px] h-fit w-full'>
                    <div className='mb-[30px]'>
                        <div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mb-20 border-b-2 laptop:mx-auto laptop:mb-[40px] text-center max-w-fit'>Categories</div>
                        <div className='laptop:flex laptop:items-center tablet:flex-wrap tablet:gap-[20px] laptop:justify-between'>
                            <div className="mb-[10px] filter_line">
                                <label htmlFor='filter'>
                                    <input type="radio" name='category' onChange={() => changeFilterType('')} id='filter' checked={categoryId === ''} />
                                    <span className="check_label font-medium">All Products</span>
                                </label>
                            </div>
                            {categories?.map((filter) => (
                                <div key={filter.id} className="mb-[10px] filter_line">
                                    <label htmlFor={`filter${filter.id}`}>
                                        <input type="radio" name='category' onChange={() => changeFilterType(filter.id)} id={`filter${filter.id}`} checked={categoryId === filter.id.toString()} />
                                        <span className="check_label font-medium">{filter.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mb-20 border-b-2 laptop:mx-auto laptop:mb-[40px] text-center max-w-fit'>Flavors</div>
                            {flavors?.map((filter) => (
                                <div key={filter.id} className="mb-[10px] filter_line checkbox">
                                    <label htmlFor={`flavors${filter.id}`}>
                                        <input type="checkbox" onChange={() => changeFlavorsType(filter.id)} id={`flavors${filter.id}`} checked={selectedFlavors.includes(filter.id)} />
                                        <span className="check_label font-medium">
                                            <IconChecked /> {filter.name}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
            </div>
        </>
    );
};

export default ProductGrid;