"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  delete_article_category_by_id,
  getArticleCategory,
  search_article_category,
} from "~/services/articleCategory";
import Filter from "../partials/filter";
import DataTable from "react-data-table-component";
import Image from "next/image";
import Loading from "~/components/loading";
import useRentModal from "~/hooks/useModelStore";
import DeleteCategory from "../modal/DeleteCategory";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdminNav from "~/hooks/useAdminNav";
import { useSWRConfig } from "swr";
import { Button } from "@mui/material";
import { HiPlusCircle } from "react-icons/hi";
import useFilterStore from "~/hooks/useFilterStore";

function ArticleCategoryTable() {
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

  const router = useRouter();
  const rentModal = useRentModal();
  const adminNav = useAdminNav();
  const [cateData, setCateData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  // const [sort, setSort] = useState("a_z");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  // const [totalPage, setTotalPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  // const [totalRow, setTotalRow] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState();
  const { mutate } = useSWRConfig();
  // Hàm lấy dữ liệu từ API
  const fetchDataFunction = async () => {
    try {
      // Gọi API để lấy dữ liệu
      const res = await search_article_category(perPage, sort, currentPage);
      const result = await res;
      setCurrentPage(result.currentPage);
      setCateData(result?.data);
      setTotalPage(result.totalPages);
      setTotalRow(result?.totalRow);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    fetchDataFunction();
  }, [perPage, sort, currentPage]);
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
  const paginationOptions = {
    rowsPerPageText: "Rows per page:",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleOpenModal = (id, row) => {
    setOpenModal(true);
    rentModal.setCategory(row);
    setIdSelected(id);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSubmit = async () => {
    try {
      await delete_article_category_by_id(idSelected);
      toast.success("Deleted successfully");
      setTimeout(() => {
        setOpenModal(false);
      }, 5000);
      mutate("/getAllArticleCategory");
      await fetchDataFunction();
      adminNav.setNavActive("ArticleCategory");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const columns = [
    {
      name: "Image",
      cell: (row) => (
        <Image
          src={row?.image || "/images/no_image.jpg"}
          alt="No Image Found"
          className="py-2"
          width={60}
          height={60}
        />
      ),
    },
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
      <div className="flex gap-x-2 ">
        <Button
          href="/admin/article-category/add-category"
          endIcon={<HiPlusCircle />}
          className=""
        >
          Add
        </Button>

        <Filter sortBy={sort} setSortBy={setSort} />
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
    <div className="container mx-auto">
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
        paginationComponentOptions={paginationOptions}
        onChangePage={handlePageChange}
        progressPending={isLoading}
        paginationRowsPerPageOptions={[5, 10, 30, 40, 50]}
        progressComponent={<Loading />}
      />
      {openModal && (
        <DeleteCategory
          onSubmit={handleSubmit}
          onClose={handleClose}
          disabled={isLoading}
          category={rentModal.category}
          showModal={openModal}
        />
      )}
    </div>
  );
}

export default ArticleCategoryTable;
