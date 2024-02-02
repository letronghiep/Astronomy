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
      <label className="ml-4">
        Sắp xếp:
        <select
          className="rounded-md  py-1.5 sm:text-sm sm:leading-6"
          value={sort}
          onChange={(e) => onSort(e)}
        >
          <option value="a_z">Từ A-Z</option>
          <option value="z_a">Từ Z-A</option>
          <option value="latest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
