"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loading from "~/app/loading";
import { delete_article_category_by_id } from "~/services/articleCategory";
import useArticleStore from "~/utils/ArticleStore";

function ArticleCategoryTable() {
  const router = useRouter();
  const isLoading = useArticleStore((state) => state.articleCategoryLoading);
  const data = useArticleStore((state) => state.articleCategory);
  const [cateData, setCateData] = useState([]);

  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

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
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-start px-2 h-20">
          <button
            onClick={() =>
              router.push(`/admin/article-category/update-category/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
          >
            Update
          </button>
          <button
            onClick={() => handleDeleteProduct(row?._id)}
            className=" w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full h-full">
      <DataTable
        columns={columns}
        data={filterData || []}
        key={"ThisArticleCategory"}
        pagination
        keyField="id"
        title={`Article Category`}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        persistTableHead
        progressPending={isLoading}
        progressComponent={<Loading />}
        subHeader
        subHeaderComponent={
          <input
            className="w-60 dark:bg-transparent py-2 px-2  outline-none  border-b-2 border-orange-600"
            type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Category Name"}
          />
        }
        className="bg-white px-4 h-4/6 "
      />
    </div>
  );
}

export default ArticleCategoryTable;
