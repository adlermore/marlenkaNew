"use client"

function PageLoader() {
  return (
    <div className='fixed z-[9999] top-0 bottom-0 right-0 left-0 bg-black bg-opacity-80 flex h-full w-full items-center justify-center'>
        <span className="loader"></span>
    </div>
  )
}

export default PageLoader