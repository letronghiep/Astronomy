"use client";
import { CloseOutlined } from "@mui/icons-material";
import React, { useMemo, useState, useTransition } from "react";
import { toast } from "react-toastify";
import DefaultPagination from "../paginate";
import Loading from "~/components/loading";
import useFilterStore from "~/hooks/useFilterStore";
import Filter from "../filter";
import useSelectedCategory from "~/hooks/useSelectedCategory";
function PickCategory({ data, title = "Choose Category" }) {
  const useSelectCategory = useSelectedCategory();

  const { selectedCategory, setSelectedCategory } = useSelectCategory;
  const [onOpen, setOnOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterText, setFilterText] = useState("");
  // const [filterData, setFilterData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [temporaryCategory, setTemporaryCategory] = useState(selectedCategory);
  const useFilter = useFilterStore();
  const { sort, setSort } = useFilter;
  const handleCategorySelect = (category) => {
    setTemporaryCategory(category);
  };
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };
  const filterData = useMemo(() => {
    if (filterText === "") {
      return data;
    } else {
      return data?.filter(
        (item) =>
          item.name.toLowerCase().indexOf(filterText?.toLowerCase()) > -1
      );
    }
  }, [filterText, data]);
  const onConfirm = () => {
    if (temporaryCategory !== null) {
      setSelectedCategory(temporaryCategory);
      setOnOpen(false);
    } else {
      toast.warn("Choose a category");
    }
  };
  const handleShowModal = () => {
    setOnOpen(true);
  };
  const handleCloseModal = () => {
    setTemporaryCategory(selectedCategory);
    setOnOpen(false);
  };
  return (
    <>
      <input
        type="text"
        placeholder={title}
        value={
          selectedCategory?.name ||
          (selectedCategory &&
            selectedCategory?.firstname + " " + selectedCategory?.lastname)
        }
        readOnly
        onClick={handleShowModal}
        className="w-full"
      />
      {onOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-neutral-800/70 z-[9999] flex justify-center items-center">
          <div className="p-3 w-4/5 border rounded-md md:w-[400px] bg-white">
            <div className="relative">
              <h2 className="pb-1 border-bottom font-bold">{title}</h2>
              <CloseOutlined
                onClick={handleCloseModal}
                fontSize="14px"
                className="absolute top-0 right-0 hover:scale-105 cursor-pointer"
              />
            </div>
            <Filter sortBy={sort} setSortBy={setSort} />
            <input
              type="search"
              className="rounded-md border-0 py-1.5 w-full text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ml-auto mt-2"
              placeholder="Search Name"
              onChange={handleSearchInput}
              value={search}
            />
            {isPending ? (
              <Loading />
            ) : (
              <ul className="flex flex-col">
                {filterData?.map((item) => (
                  <li
                    className="flex justify-start gap-x-3 items-center"
                    key={item._id}
                  >
                    <input
                      type="radio"
                      id={`category-${item._id}`}
                      name="category"
                      value={item._id}
                      checked={temporaryCategory?._id === item._id}
                      onChange={() => handleCategorySelect(item)}
                      // {...register("category", { required: true })}
                    />
                    <label htmlFor={`category-${item._id}`}>
                      {item.name || item?.firstname + " " + item?.lastname}
                    </label>
                  </li>
                ))}
              </ul>
            )}
            <DefaultPagination />

            <div className="flex items-center justify-around mt-2">
              <button
                className="bg-blue-600 text-white px-8 py-1 rounded hover:opacity-70"
                onClick={onConfirm}
              >
                OK
              </button>
              <button
                className="bg-red-600 text-white px-8 py-1 rounded hover:opacity-70"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PickCategory;
