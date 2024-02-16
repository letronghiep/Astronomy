"use client";
import React from "react";
import useFilterStore from "~/hooks/useFilterStore";

function Filter() {
  const useFilter = useFilterStore();
  const { sort, setSort } = useFilter;
  const onSort = (e) => {
    setSort(e.target.value);
  };
  return (
    <div className="mr-4">
      <select
        className="rounded-md  py-1.5 sm:text-sm text-sm"
        value={sort}
        onChange={(e) => onSort(e)}
      >
        <option value="a_z">A-Z</option>
        <option value="z_a">Z-A</option>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}

export default Filter;
