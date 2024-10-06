import IconSearch from "@/public/icons/IconSearch";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

function SearchToggle() {
  const [searchOpened, setsearchOpened] = useState(false);
  const SearchRef = useRef(null);
  const ref = useRef();
  const router = useRouter(); // Initialize the router

  useOnClickOutside(ref, () => {
    if (searchOpened) {
      setsearchOpened(false);
    }
  });

  const inputToggleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (SearchRef.current)  {
      const searchValue = SearchRef.current.value; 
      setsearchOpened(!searchOpened); 

      if (searchValue) {
        router.push(`/productListing?filter=${encodeURIComponent(searchValue)}`);
        SearchRef.current.value = ''
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputToggleSubmit(e);
    }
  };

  return (
    <div
      className={`${searchOpened ? "search_li opened" : "search_li"} laptop:fixed laptop:top-[43px] mobile:top-[95px] laptop:right-[90px] mobile:right-[25px]`}
      ref={ref}
    >
      <input  onKeyDown={handleKeyDown}  type="text" ref={SearchRef} placeholder="Search ..." />
      <a href="/#" className="search_btn" onClick={(e) => inputToggleSubmit(e)}>
        <IconSearch
          className={`${
            searchOpened
              ? "text-black [&>path]:fill-black"
              : "text-whitsiteCreme [&>path]:fill-siteCrem mobile:[&>path]:fill-black"
          } [&>path]:duration-300`}
        />
      </a>
    </div>
  );
}

export default SearchToggle;
