
import React, { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';
import ListingPage from '@/components/listing/ListingPage';


export default  async function Page() {

  const res = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getCategories', { cache: 'no-cache' })
  const { data } = await res.json()

  const resProduct = await fetch(process.env.NEXT_PUBLIC_DATA_API + '/getFlavors', { cache: 'no-cache' })
  const { data: flavors  } = await resProduct.json()
	
	return (
		<div className='product_page bg-white'>
			<Suspense fallback={<PageLoader />}>
				<ListingPage flavors={flavors.flavors} categories={data.categories} />
			</Suspense>
		</div>
	);
}