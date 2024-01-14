"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import Loading from "~/app/loading";
import { delete_article_category_by_id, search_article_category } from "~/services/articleCategory";
import useArticleStore from "~/utils/ArticleStore";
import DataTable from "../table/DataTable";
import { Pagination } from "flowbite-react";
import useSWR from "swr";

function ArticleCategoryTable() {
  const router = useRouter();
  // const isLoading = useArticleStore((state) => state.articleCategoryLoading);
  const data = useArticleStore((state) => state.articleCategory);
  const [cateData, setCateData] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterData, setFilterData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCateData(data);
  }, [data]);
  useEffect(() => {
    setFilterData(cateData);
  }, [cateData]);

  useEffect(() => {
    if (search === "") {
      setFilterData(cateData);
    } else {
      setFilterData(
        cateData?.filter((item) => {
          const itemData = item?.name.toLowerCase();
          const text = search.toLowerCase();
          return itemData.indexOf(text) > -1;
        })
      );
    
    }
  }, [search, cateData]);
  const handleDeleteProduct = async (id) => {
    const result = await delete_article_category_by_id(id);
    if (result) {
      toast.success("Delete Successfull");
      mutate("/getAllArticleCategory");
    } else {
      toast.error("Something went wrong");
    }
  };
  const onPageChange = () => {};
  const columns = [
    {
      idx: 1,
      name: "Image",
      selector: "image",
    },
    {
      idx: 2,
      name: "Name",
      selector: "name",
    },
    {
      idx: 3,
      name: "Description",
      selector: "description",
    },
  ];
  const SearchComponent = (
    <div className="flex justify-between">
      <div className="flex gap-x-3">
        <div>
          <span className="mr-2">Sắp xếp</span>
          <select className="rounded-md  py-1.5 sm:text-sm sm:leading-6">
            <option value="a_z">Từ A-Z</option>
            <option value="z_a">Từ Z-A</option>
            <option value="latest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>
      </div>
      <input
        type="search"
        className="rounded-md border-0 py-1.5 w-[300px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ml-auto"
        placeholder="Search Name"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
  return (
    <div className="w-full">
        <DataTable
          data={filterData}
          columns={columns}
          searchComponent={SearchComponent}
        />

      <div className="flex items-center justify-between">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={1000}
          onPageChange={onPageChange}
          previousLabel=""
          nextLabel=""
          showIcons
          className="mx-auto"
        />
        <div>
          <span className="mr-2">Hiển thị</span>
          <select className="rounded-md  py-1.5 sm:text-sm sm:leading-6">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ArticleCategoryTable;
