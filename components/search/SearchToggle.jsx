import IconSearch from "@/public/icons/IconSearch";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import React, { useRef, useState } from "react";

function SearchToggle() {
	
  const [searchOpened, setsearchOpened] = useState(false);
  const SearchRef = useRef(null);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    if (searchOpened) {
      setsearchOpened(false);
    }
  });

  const inputToggleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (SearchRef.current) {
      setsearchOpened(!searchOpened);
    }
  };

  return (
    <div className={`${searchOpened ? "search_li opened" : "search_li"} laptop:fixed  laptop:top-[43px] laptop:right-[90px]`} ref={ref}>
      <input type="text" ref={SearchRef} placeholder="Search ..." />
      <a href="/#" className="search_btn" onClick={(e) => inputToggleSubmit(e)}>
        <IconSearch
          className={`${
            searchOpened
              ? "text-black [&>path]:fill-black"
              : "text-whitsiteCreme [&>path]:fill-siteCrem"
          } [&>path]:duration-300`}
        />
      </a>
    </div>
  );
}

export default SearchToggle;
