"use client";
import { CloseOutlined } from "@mui/icons-material";
import React, { useEffect, useMemo, useTransition } from "react";
import { useState } from "react";
import Filter from "../filter";
import Loading from "~/components/loading";
import useSelectedTag from "~/hooks/useSelectedTag";
import useFilterStore from "~/hooks/useFilterStore";
import { get_product_category } from "~/services/product-category";

function PickTags({}) {
  const useSelectedTags = useSelectedTag();
  const { tags, setTags, selectedTags, setSelectedTags } = useSelectedTags;
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [temporaryTags, setTemporaryTags] = useState(selectedTags);
  const [filterText, setFilterText] = useState("");
  const useFilter = useFilterStore();
  const { sort, setSort, setPerPage, perPage, currentPage } = useFilter;
  const handleShowModal = () => {
    setOpenModal(true);
  };
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };
  const handleCategorySelect = (newTag) => {
    setTemporaryTags((prevTags) => {
      if (prevTags.map((item) => item).includes(newTag)) {
        console.log(prevTags);
        const result = prevTags.filter((e) => e !== newTag).map((item) => item);
        return result;
      } else {
        const result = [...prevTags, newTag];
        return result;
      }
    });
    console.log("====================================");
    console.log(temporaryTags);
    console.log("====================================");
    setSelectedTags([...temporaryTags]);
  };
  const handleCloseModal = () => {
    setTemporaryTags([...selectedTags]);
    setOpenModal(false);
  };
  const onConfirm = () => {
    setSelectedTags([...temporaryTags]);
    setOpenModal(false);
  };
  const filterTags = useMemo(() => {
    if (filterText === "") return tags;
    else
      return tags.filter(
        (item) => item.toLowerCase().indexOf(filterText.toLowerCase()) > -1
      );
  }, [filterText, tags]);
  return (
    <>
      <input
        type="text"
        placeholder="Choose tags"
        value={selectedTags?.join(", ")}
        readOnly
        onClick={handleShowModal}
      />
      {openModal && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-neutral-800/70 z-[9999] flex justify-center items-center"
        >
          <div className="p-3 w-4/5 border rounded-md md:w-[400px] bg-white">
            <div className="relative">
              <h2 className="pb-1 border-bottom font-bold">
                Choose a category
              </h2>
              <CloseOutlined
                onClick={handleCloseModal}
                fontSize="14px"
                className="absolute top-0 right-0 hover:scale-105 cursor-pointer"
              />
            </div>
            <Filter />
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
                {filterTags.length > 0 ? (
                  filterTags.map((item) => (
                    <li
                      className="flex justify-start gap-x-3 items-center"
                      key={item}
                    >
                      <input
                        type="checkbox"
                        id={`category-${item}`}
                        name="category"
                        value={item}
                        checked={temporaryTags.map((tag) => tag).includes(item)}
                        onChange={() => handleCategorySelect(item)}
                        // {...register("category", { required: true })}
                      />
                      <label htmlFor={`category-${item}`}>{item}</label>
                    </li>
                  ))
                ) : (
                  <p className="text-center h-[80px] flex justify-center items-center">
                    There is have no tags{" "}
                  </p>
                )}
              </ul>
            )}
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

export default PickTags;
