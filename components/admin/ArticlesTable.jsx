"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useArticleStore from "~/hooks/useArticleStore";
import Filter from "../partials/filter";
import Loading from "~/components/loading";
import useRentModal from "~/hooks/useModelStore";
import useAdminNav from "~/hooks/useAdminNav";
import { delete_article_by_id, search_articles } from "~/services/articles";
import DeleteCategory from "../modal/DeleteCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteArticle from "../modal/DeleteArticle";
import { Button } from "@mui/material";
import { HiPlusCircle } from "react-icons/hi";
import useFilterStore from "~/hooks/useFilterStore";

function ArticlesTable() {
  const router = useRouter();
  const useFilter = useFilterStore();

  const {
    sort,
    perPage,
    currentPage,
    totalRow,
    setSort,
    setPerPage,
    setCurrentPage,
    setTotalPage,
    setTotalRow,
  } = useFilter;
  const rentModal = useRentModal();
  const adminNav = useAdminNav();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataFunction = async () => {
    try {
      const res = await search_articles(perPage, sort, currentPage);
      const result = await res;
      setCurrentPage(result.currentPage);
      setData(result.data);
      setTotalRow(result.totalRow);
      setTotalPage(result.totalPages);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    fetchDataFunction(perPage, sort, currentPage);
  }, [perPage, sort, currentPage]);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  useEffect(() => {
    if (search === "") {
      setFilterData(data);
    } else {
      const filteredData = data?.filter(
        (item) => item?.title.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      setFilterData(filteredData);
    }
  }, [search, data]);
  const paginationOptions = {
    rowsPerPageText: "Row per page: ",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleOpenModal = (id, row) => {
    setOpenModal(true);
    setIdSelected(id);
    rentModal.setArticle(row);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSubmit = async () => {
    try {
      await delete_article_by_id(idSelected);
      toast.success("Deleted successfully");
      setTimeout(() => {
        setOpenModal(false);
      }, 5000);
      await fetchDataFunction();
      adminNav.setNavActive("Articles");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const columns = [
    {
      name: "Category",
      selector: (row) => row?.category,
      width: "180px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Image",
      cell: (row) => (
        <Image
          src={row?.image || "/images/no_image.jpg"}
          width={100}
          height={100}
          alt="Image"
        />
      ),
      width: "100px",
    },
    {
      name: "Title",
      cell: (row) => row?.title,
    },
    {
      name: "Description",
      cell: (row) =>
        row?.description.length > 200
          ? row?.description.substring(0, 200) + "..."
          : row?.description,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-start px-2 h-20">
          <button
            onClick={() =>
              router.push(`/admin/articles/article-detail/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-blue-600 hover:text-white my-2 hover:bg-blue-600 border border-blue-600 rounded transition-all duration-700"
          >
            Details
          </button>
          <button
            onClick={() =>
              router.push(`/admin/articles/update-article/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
          >
            Update
          </button>
          <button
            onClick={() => handleOpenModal(row?._id, row)}
            className=" w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const SearchComponent = (
    <div className="flex justify-between mb-4 flex-col md:flex-row gap-2 my-2">
      <Button
        href="/admin/articles/add-article"
        endIcon={<HiPlusCircle />}
        className=""
      >
        Add
      </Button>
      <Filter
        // perPage={perPage}
        // setPerPage={setPerPage}
        sortBy={sort}
        setSortBy={setSort}
      />
      <input
        type="search"
        className="rounded-md border-0 py-1.5 w-[300px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ml-auto"
        placeholder="Search Name"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
  return (
    <div className="w-[90%] mx-auto">
      <DataTable
        columns={columns}
        data={filterData || []}
        subHeader
        subHeaderComponent={SearchComponent}
        subHeaderAlign="right"
        pagination
        paginationServer
        paginationTotalRows={totalRow}
        onChangeRowsPerPage={handlePerPageChange}
        onChangePage={handlePageChange}
        paginationComponentOptions={paginationOptions}
        progressPending={isLoading}
        progressComponent={<Loading />}
      />
      {openModal && (
        <DeleteArticle
          onSubmit={handleSubmit}
          onClose={handleClose}
          showModal={openModal}
          article={rentModal.article}
          disabled={isLoading}
        />
      )}
    </div>
  );
}

export default ArticlesTable;
