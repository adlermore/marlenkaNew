'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import cover1 from "@/public/images/cover1.png";
import IconChecked from '@/public/icons/IconChecked';
import ProductGrid from './ProductGrid';
import { servings } from '@/utils/data/settingsData';

const ListingPage = ({ flavors, categories }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [categoryId, setCategoryId] = useState(searchParams.get('category') || '');
    const [selectedServings, setSelectedServings] = useState(searchParams.get('servings') || '');

    // Local state for filters
    const [tempSelectedFlavors, setTempSelectedFlavors] = useState([]);
    const [tempCategoryId, setTempCategoryId] = useState(categoryId);
    const [tempSelectedServings, setTempSelectedServings] = useState(selectedServings);

    // State for current category to be updated after applying filters
    const [currentCategory, setCurrentCategory] = useState(categories.find(category => category.id.toString() === categoryId) || {});

    // Default category to "All Products"
    const defaultCategoryId = '';

    // Handle category change
    const changeCategoryType = (category) => {
        setTempCategoryId(category); // Update local state
    };

    // Handle flavor selection
    const changeFlavorsType = (flavorId) => {
        setTempSelectedFlavors(prev => {
            const newSelectedFlavors = prev.includes(flavorId) 
                ? prev.filter(id => id !== flavorId) 
                : [...prev, flavorId];
            return newSelectedFlavors; 
        });
    };

    // Handle servings change
    const changeServingsType = (servingId) => {
        setTempSelectedServings(servingId); // Update local state for servings
    };

    // Apply filters and update search params
    const applyFilters = () => {
        setSelectedFlavors(tempSelectedFlavors);
        setCategoryId(tempCategoryId);
        setSelectedServings(tempSelectedServings);

        // Update current category based on applied filters
        const appliedCategory = categories.find(category => category.id.toString() === tempCategoryId) || {};
        setCurrentCategory(appliedCategory);

        // Update search params
        const params = new URLSearchParams();
        if (tempCategoryId) params.set('category', tempCategoryId);
        if (tempSelectedFlavors.length > 0) params.set('flavors', tempSelectedFlavors.join(','));
        if (tempSelectedServings) params.set('servings', tempSelectedServings);

        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Reset filters
    const resetFilters = () => {
        setTempSelectedFlavors([]);
        setTempCategoryId(defaultCategoryId);
        setTempSelectedServings('');

        // Reset ProductGrid state
        setSelectedFlavors([]);
        setCategoryId(defaultCategoryId);
        setSelectedServings('');

        setCurrentCategory(categories.find(category => category.id.toString() === defaultCategoryId) || {});

        router.push(`?`, { scroll: false }); 
    };

    // Update local states based on URL search params
    useEffect(() => {
        const flavorsParam = searchParams.get('flavors') ? searchParams.get('flavors').split(',') : [];
        const categoryParam = searchParams.get('category') || '';
        const servingsParam = searchParams.get('servings') || '';

        setSelectedFlavors(flavorsParam);
        setCategoryId(categoryParam);
        setSelectedServings(servingsParam);

        // Update current category based on search params
        const updatedCategory = categories.find(category => category.id.toString() === categoryParam) || {};
        setCurrentCategory(updatedCategory);
    }, [searchParams]);

    return (
        <>
            <div className='bg-[#FFEED9] py-[50px] laptopHorizontal:py-[30px] tablet:py-[20px]'>
                <div className='custom_container !mt-[130px] mobile:!mt-[150px] text-[32px] laptopHorizontal:text-2xl laptop:text-xl tablet:text-base text-[#B62025] uppercase text-center'> Products </div>
            </div>
            <div className='cover_bg w-full relative h-[660px]'>
                <Image
                    src={currentCategory.image_path ?
                         process.env.NEXT_PUBLIC_DATA + (currentCategory.image_path || '')
                         :
                         cover1
                        }
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
                                        onChange={() => changeCategoryType(defaultCategoryId)} 
                                        id='filter' 
                                        checked={tempCategoryId === defaultCategoryId} 
                                    />
                                    <span className="check_label font-medium">All Products</span>
                                </label>
                            </div>
                            {categories?.map((filter) => (
                                <div key={filter.id} className="mb-[10px] filter_line">
                                    <label htmlFor={`filter${filter.id}`}>
                                        <input 
                                            type="radio" 
                                            name='category' 
                                            onChange={() => changeCategoryType(filter.id.toString())} 
                                            id={`filter${filter.id}`} 
                                            checked={tempCategoryId === filter.id.toString()} 
                                        />
                                        <span className="check_label font-medium">{filter.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mt-[30px] border-siteCrem pt-[10px] mb-20 border-t-2  laptop:mx-auto laptop:mb-[40px]  max-w-[170px]'>Flavors</div>
                            {flavors?.map((flavor) => (
                                <div key={flavor.id} className="mb-[10px] filter_line checkbox">
                                    <label htmlFor={`flavors${flavor.id}`}>
                                        <input 
                                            type="checkbox" 
                                            onChange={() => changeFlavorsType(flavor.id)} 
                                            id={`flavors${flavor.id}`} 
                                            checked={tempSelectedFlavors.includes(flavor.id)} 
                                        />
                                        <span className="check_label font-medium">
                                            <IconChecked /> {flavor.name}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className='text-[#B62025] text-[32px] laptopHorizontal:text-2xl mt-[30px] border-siteCrem pt-[10px] mb-20 border-t-2  laptop:mb-[40px]  max-w-[170px]'>Servings</div>
                        <div className='laptop:flex laptop:items-center tablet:flex-wrap tablet:gap-[20px] laptop:justify-between'>
                            {servings?.map((serving) => (
                                <div key={serving.id} className="mb-[10px] filter_line">
                                    <label htmlFor={`serving${serving.id}`}>
                                        <input 
                                            type="radio" 
                                            name='servings' 
                                            onChange={() => changeServingsType(serving.id.toString())} 
                                            id={`serving${serving.id}`} 
                                            checked={tempSelectedServings === serving.id.toString()} 
                                        />
                                        <span className="check_label font-medium">{serving.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='mt-[30px] flex items-center gap-[20px]'>
                            <button className='site_btn  mx-auto my-[15px]' onClick={applyFilters}>Apply</button>
                            <button className='site_btn reset mx-auto' onClick={resetFilters}>Reset</button>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <ProductGrid
                        selectedFlavors={selectedFlavors}
                        categoryId={categoryId}
                        searchFilter={searchParams.get('filter') || ''}
                        selectedServings={selectedServings}
                    />
                </div>
            </div>
        </>
    );
};

export default ListingPage;
