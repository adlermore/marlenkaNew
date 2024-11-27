'use client';
import React, { useState, useMemo, Suspense, useEffect } from 'react';
import Image from 'next/image';
import cover1 from "@/public/images/cover1.png";
import IconChecked from '@/public/icons/IconChecked';
import ProductGrid from './ProductGrid';
import PageLoader from '../PageLoader';
import { useSearchParams } from 'next/navigation';

export const filterSubCategory = [
	{ name: 'All Products', id: '0' },
	{ name: 'Cakes', id: '1' },
	{ name: 'Rolls', id: '2' },
	{ name: 'Eclairs', id: '3' },
	{ name: 'Napoleons', id: '4' },
	{ name: 'Snacks', id: '5' },
	{ name: ' Nuggets', id: '6' },
	{ name: 'Specials', id: '7' }
];

export const filterFineness = [
	{ name: 'Honey', id: '1' },
	{ name: 'Walnut', id: '2' },
	{ name: 'Cocoa', id: '3' },
	{ name: 'Cinnamon', id: '4' },
	{ name: 'Lemon', id: '5' },
	{ name: 'Apricot', id: '6' },
	{ name: 'Gluten Free', id: '7' }
];

export const filterType = [
	{ name: '1', id: '1' },
	{ name: '2-3', id: '2' },
	{ name: '4-8', id: '3' },
	{ name: '8+', id: '4' }
];

const ListingPage = ({ categories }) => {

	const searchParams = useSearchParams();
	const [filters, setFilters] = useState({
		subcategoryId: searchParams.get('category') || '0',
		typeId: '',
		finenessIds: [],
	});
	
	const currentCategory = useMemo(() => {
		return categories.find(category => category.id.toString() === filters.subcategoryId) || {};
	}, [filters.subcategoryId, categories]);

	// Effect to update filters based on search parameters
	useEffect(() => {
		const categoryParams = searchParams.get('category');
		if (categoryParams) {
			setFilters(prevFilters => ({
				...prevFilters,
				subcategoryId: categoryParams,
			}));
		}
	}, [searchParams]);

	// Function to update search params
	const updateSearchParams = (newFilters) => {
		const params = new URLSearchParams();
		if (newFilters.subcategoryId) {
			params.set('category', newFilters.subcategoryId);
		}
		if (newFilters.typeId) {
			params.set('type', newFilters.typeId);
		}
		if (newFilters.finenessIds.length > 0) {
			params.set('finenessIds', newFilters.finenessIds.join(','));
		}
		window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
	};

	const handleFilterChange = (filterType, value) => {
		setFilters(prevFilters => {
			const updatedFilters = {
				...prevFilters,
				[filterType]: filterType === 'finenessIds'
					? prevFilters[filterType].includes(value)
						? prevFilters[filterType].filter(item => item !== value)
						: [...prevFilters[filterType], value]
					: value,
			};
			updateSearchParams(updatedFilters); // Update search params
			return updatedFilters;
		});
	};

	const clearAllFilters = () => {
		const clearedFilters = { subcategoryId: '0', typeId: '', finenessIds: [] };
		setFilters(clearedFilters);
		updateSearchParams(clearedFilters); // Clear search params
	};

	return (
		<>
			<div className='!mt-[120px] mobile:mt-[150px]' />
			<div className='cover_bg w-full relative h-[550px] mobile:h-[300px]'>
				<Image src={currentCategory.image_path ? process.env.NEXT_PUBLIC_DATA + currentCategory.image_path : cover1} fill alt="Cover image" priority={true} unoptimized={true} sizes="90vw" style={{ objectFit: "cover" }} />
			</div>
			<div className='cover_container flex laptop:block gap-[25px] !mt-[70px] laptop:!mt-[40px] laptopHorizontal:gap-20'>
				<div className='filter_block p-[25px] max-w-[290px] laptop:max-w-none laptopHorizontal:max-w-[230px] laptopHorizontal:p-[15px] h-fit w-full'>
					<div className='mb-[30px]'>
						<div className='text-[#B62025]  text-[20px] laptopHorizontal:text-xl mb-20 laptop:mx-auto laptop:mb-[40px] font-medium text-center max-w-fit'>Categories</div>
						<div className='laptop:flex laptop:flex-wrap tablet:flex-wrap mobile:grid mobile:grid-cols-2 tablet:gap-[20px] mobile:gap-[10px] laptop:justify-between'>
							{filterSubCategory.map((filter) => (
								<div key={filter.id} className="mb-[10px] filter_line radio_line">
									<label htmlFor={`filter1${filter.id}`}>
										<input
											type="radio"
											name='filterSubCategory'
											checked={filters.subcategoryId === filter.id}
											onChange={() => handleFilterChange('subcategoryId', filter.id)}
											id={`filter1${filter.id}`}
										/>
										<span className="square_block">
											<span className='opacity-0 duration-300'><IconChecked /></span>
										</span>
										<span 
											// className="check_label font-medium"
											className={`check_label font-medium ${filters.subcategoryId === filter.id ? 'active' : ''}`}
										>
											{filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
										</span>
									</label>
								</div>
							))}
						</div>
						<div>
							<div className='text-[#B62025]  text-[20px] font-medium laptopHorizontal:text-xl mt-[30px] border-siteCrem pt-[10px] mobile:w-full mobile:max-w-none mb-20 border-t-2 laptop:text-center max-w-[170px]'>Flavors</div>
							<div className='laptop:flex laptop:max-w-[350px] laptop:flex-wrap mobile:grid mobile:gap-[10px] mobile:grid-cols-2'>
								{filterFineness.map((filter , index) => (
									<div key={`${filter.id}-${index}`} className="mb-[10px] filter_line">
										<label htmlFor={`filterFineness${filter.id}`}>
											<input
												type="checkbox"
												checked={filters.finenessIds.includes(filter.id)}
												onChange={() => handleFilterChange('finenessIds', filter.id)}
												id={`filterFineness${filter.id}`}
											/>
											<span className="square_block">
												<span className='opacity-0 duration-300'><IconChecked /></span>
											</span>
											<span 
												// className="check_label font-medium"
												className={`check_label font-medium ${filters.finenessIds.includes(filter.id) ? 'active' : ''}`}
											>
												{filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
											</span>
										</label>
									</div>
								))}
							</div>
						</div>
						<div className='text-[#B62025] text-[20px]  font-medium laptopHorizontal:text-xl mt-[30px] border-siteCrem pt-[10px] mb-20 border-t-2 mobile:max-w-none  laptop:text-center max-w-[170px]'>Servings</div>
						<div className='laptop:flex laptop:max-w-[350px] laptop:flex-wrap mobile:justify-between'>
							{filterType.map((filter , index) => (
								<div key={`${filter.id}-${index}`} className="mb-[10px] filter_line lts_tst radio_line">
									<label htmlFor={`filter2${filter.id}`}>
										<input
											type="radio"
											name='filterSubCategoryType'
											checked={filters.typeId === filter.id}
											onChange={() => handleFilterChange('typeId', filter.id)}
											id={`filter2${filter.id}`}
										/>
										<span className="square_block">
											<span className='opacity-0 duration-300'><IconChecked /></span>
										</span>
										<span 
											// className="check_label font-medium"
											className={`check_label font-medium ${filters.typeId === filter.id ? 'active' : ''}`}
										>
											{filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}
										</span>
									</label>
								</div>
							))}
						</div>
						<div className='mt-[30px] flex items-center mobile:justify-center gap-[20px]'>
							<button className='site_btn clear_button normal_btn mobile:!mx-auto mx-auto' onClick={clearAllFilters}>Clear</button>
						</div>
					</div>
				</div>
				<div className='w-full'>
				<div className='text-[#B62025] text-[26px] pl-[40px] whitespace-nowrap mobile:max-w-none uppercase mt-[15px] laptopHorizontal:text-2xl pt-[10px] mb-[40px]  laptop:text-center max-w-[170px]'>
					{filterSubCategory[filters.subcategoryId]?.name || `All Products`}
				</div>
					<Suspense fallback={<PageLoader />}>
						<ProductGrid filters={filters} />
					</Suspense>
				</div>
			</div>
		</>
	);
};

export default ListingPage;