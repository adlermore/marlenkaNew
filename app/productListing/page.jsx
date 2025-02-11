
import React, { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import ListingPage from '@/components/listing/ListingPage';

export default  async function Page() {

  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getCategories', { cache: 'no-cache' })
  const { data } = await res.json()
	
	return (
		<div className='product_page bg-white'>
			<Suspense fallback={<PageLoader />}>
				<ListingPage  categories={data.categories} />
			</Suspense>
		</div>
	);
}