'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import cover1 from "@/public/images/cover1.png";
import IconChecked from '@/public/icons/IconChecked';
import ProductGrid from './ProductGrid';
import { servings } from '@/utils/data/settingsData';

const ListingPage = ({ flavors, categories }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filters, setFilters] = useState({
        selectedFlavors: [],
        categoryId: searchParams.get('category') || '',
        selectedServings: searchParams.get('servings') || '',
    });

    const [tempFilters, setTempFilters] = useState({
        selectedFlavors: [],
        categoryId: filters.categoryId,
        selectedServings: filters.selectedServings,
    });

    const currentCategory = useMemo(() => {
        return categories.find(category => category.id.toString() === filters.categoryId) || {};
    }, [filters.categoryId, categories]);

    const changeCategoryType = (categoryId) => {
        setTempFilters(prev => ({ ...prev, categoryId }));
    };

    const changeFlavorsType = (flavorId) => {
        setTempFilters(prev => {
            const newFlavors = prev.selectedFlavors.includes(flavorId)
                ? prev.selectedFlavors.filter(id => id !== flavorId)
                : [...prev.selectedFlavors, flavorId];
            return { ...prev, selectedFlavors: newFlavors };
        });
    };

    const changeServingsType = (servingId) => {
        setTempFilters(prev => ({ ...prev, selectedServings: servingId }));
    };

    const applyFilters = () => {
        setFilters(tempFilters);
        const params = new URLSearchParams();
        if (tempFilters.categoryId) params.set('category', tempFilters.categoryId);
        if (tempFilters.selectedFlavors.length > 0) params.set('flavors', tempFilters.selectedFlavors.join(','));
        if (tempFilters.selectedServings) params.set('servings', tempFilters.selectedServings);

        router.push(`?${params.toString()}`, { scroll: false });
    };

    const resetFilters = () => {
        const defaultFilters = {
            selectedFlavors: [],
            categoryId: '',
            selectedServings: '',
        };
        setTempFilters(defaultFilters);
        setFilters(defaultFilters);
        router.push(`?`, { scroll: false });
    };

    useEffect(() => {
        const flavorsParam = searchParams.get('flavors') ? searchParams.get('flavors').split(',') : [];
        const categoryParam = searchParams.get('category') || '';
        const servingsParam = searchParams.get('servings') || '';

        setFilters({
            selectedFlavors: flavorsParam,
            categoryId: categoryParam,
            selectedServings: servingsParam,
        });

        setTempFilters(prev => ({
            ...prev,
            categoryId: categoryParam,
            selectedServings: servingsParam,
        }));
    }, [searchParams]);

    return (
        <>
            <div className='bg-[#FFEED9] py-[50px] laptopHorizontal:py-[30px] tablet:py-[20px]'>
                <div className='custom_container !mt-[130px] mobile:!mt-[150px] text-[32px] laptopHorizontal:text-2xl laptop:text-xl tablet:text-base text-[#B62025] uppercase text-center'> Products </div>
            </div>
            <div className='cover_bg w-full relative h-[660px]'>
                <Image
                    src={currentCategory.image_path ? 
                         process.env.NEXT_PUBLIC_DATA + currentCategory.image_path : cover1}
                    fill
                    alt="Cover image" 
                    priority={true} 
                    unoptimized={true} 
                    sizes="90vw" 
                    style={{ objectFit: "cover" }} 
                />
            </div>
            <div className='cover_container flex laptop:block gap-[25px] !mt-[70px] laptop:!mt-[40px] laptopHorizontal:gap-20'>
                <div className='filter_block border border-1 border-[#F8F6F5] p-[25px] max-w-[290px] laptop:max-w-none laptopHorizontal:max-w-[230px] laptopHorizontal:p-[15px] h-fit w-full'>
                    <div className='mb-[30px]'>
                        <div className='text-[#B62025] uppercase text-[32px] laptopHorizontal:text-2xl mb-20 laptop:mx-auto laptop:mb-[40px] text-center max-w-fit'>Categories</div>
                        <div className='laptop:flex laptop:items-center tablet:flex-wrap tablet:gap-[20px] laptop:justify-between'>
                            <div className="mb-[10px] filter_line">
                                <label htmlFor='filter'>
                                    <input 
                                        type="radio" 
                                        name='category' 
                                        onChange={() => changeCategoryType('')} 
                                        id='filter' 
                                        checked={tempFilters.categoryId === ''} 
                                    />
                                    <span className="check_label font-medium">All Products</span>
                                </label>
                            </div>
                            {categories.map((filter) => (
                                <div key={filter.id} className="mb-[10px] filter_line">
                                    <label htmlFor={`filter${filter.id}`}>
                                        <input 
                                            type="radio" 
                                            name='category' 
                                            onChange={() => changeCategoryType(filter.id.toString())} 
                                            id={`filter${filter.id}`} 
                                            checked={tempFilters.categoryId === filter.id.toString()} 
                                        />
                                        <span className="check_label font-medium">{filter.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mt-[30px] border-siteCrem pt-[10px] mb-20 border-t-2 laptop:mx-auto laptop:text-center  laptop:mb-[40px] max-w-[170px]'>Flavors</div>
                            <div className='laptop:flex laptop:gap-20 laptop:justify-between laptop:flex-wrap '>
                            {flavors.map((flavor) => (
                                <div key={flavor.id} className="mb-[10px] filter_line checkbox">
                                    <label htmlFor={`flavors${flavor.id}`}>
                                        <input 
                                            type="checkbox" 
                                            onChange={() => changeFlavorsType(flavor.id)} 
                                            id={`flavors${flavor.id}`} 
                                            checked={tempFilters.selectedFlavors.includes(flavor.id)} 
                                        />
                                        <span className="check_label font-medium">
                                            <IconChecked /> {flavor.name}
                                        </span>
                                    </label>
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mt-[30px] border-siteCrem pt-[10px] mb-20 border-t-2 laptop:mx-auto laptop:text-center laptop:mb-[40px] max-w-[170px]'>Servings</div>
                        <div className='laptop:flex laptop:items-center tablet:flex-wrap laptop:max-w-[350px] laptop:mx-auto tablet:gap-[20px] laptop:justify-between'>
                            {servings.map((serving) => (
                                <div key={serving.id} className="mb-[10px] filter_line">
                                    <label htmlFor={`serving${serving.id}`}>
                                        <input 
                                            type="radio" 
                                            name='servings' 
                                            onChange={() => changeServingsType(serving.id.toString())} 
                                            id={`serving${serving.id}`} 
                                            checked={tempFilters.selectedServings === serving.id.toString()} 
                                        />
                                        <span className="check_label font-medium">{serving.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='mt-[30px] flex items-center gap-[20px]'>
                            <button className='site_btn mx-auto my-[15px]' onClick={applyFilters}>Apply</button>
                            <button className='site_btn reset mx-auto' onClick={resetFilters}>Reset</button>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <ProductGrid
                        selectedFlavors={filters.selectedFlavors}
                        categoryId={filters.categoryId}
                        searchFilter={searchParams.get('filter') || ''}
                        selectedServings={filters.selectedServings}
                    />
                </div>
            </div>
        </>
    );
};

export default ListingPage;
