"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import DataTable from "react-data-table-component";
import { HiPlusCircle } from "react-icons/hi";
import Loading from "~/components/loading";
import {
  delete_product_category_by_id,
  get_product_category,
} from "~/services/product-category";
import Filter from "../partials/filter";
import DeleteProductCategory from "../modal/delete-product-category";
import { toast } from "react-toastify";
import useAdminNav from "~/hooks/useAdminNav";

function ProductCategoryTable() {
  const router = useRouter();

  const [category, setCategory] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterText, setFilterText] = useState("");
  const [sort, setSort] = useState("a_z");

  const [isPending, startTransition] = useTransition();
  const [perPage, setPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState(false);
  const [totalRow, setTotalRow] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const adminNav = useAdminNav();
  const fetchCategory = async () => {
    const data = await get_product_category(perPage, sort, currentPage);
    setCategory(data?.data);
    setTotalRow(data?.totalRow);
    setTotalPage(data?.totalPage);
    // setPerPage(data.perPage);
    setCurrentPage(data?.currentPage);
  };

  useEffect(() => {
    fetchCategory();
  }, [category]);
  useEffect(() => {
    setFilterCategory(category);
  }, [category]);
  useMemo(() => {
    if (filterText === "") {
      setFilterCategory(category);
    } else {
      const filteredList = category?.filter(
        (item) => item.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
      );
      setFilterCategory(filteredList);
    }
  }, [filterText, category]);
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
    setSelectedCategory(row);
    setIdSelected(id);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSubmit = async () => {
    try {
      await delete_product_category_by_id(idSelected);
      toast.success("Deleted successfully");
      setTimeout(() => {
        setOpenModal(false);
      }, 5000);
      await fetchCategory();
      adminNav.setNavActive("ProductCategory");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleSearchInput = (e) => {
    setSearchString(e.target.value);
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };
  const SearchComponent = (
    <>
      <div className="flex justify-between mb-4 flex-col md:flex-row gap-2 my-2">
        <Button
          href="/admin/product-category/add-category"
          endIcon={<HiPlusCircle />}
          className=""
        >
          Add
        </Button>
        <Filter sortBy={sort} setSortBy={setSort} />
        <input
          type="search"
          className="rounded-md border-0 py-1.5 w-[300px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ml-auto"
          placeholder="Search Name"
          onChange={handleSearchInput}
          value={searchString}
        />
      </div>
    </>
  );
  const handleClose = () => {
    setOpenModal(false);
  };
  const columns = [
    // {
    //   name: "Image",
    //   cell: (row) => (
    //     <Image
    //       src={row?.image || "/images/no_image.jpg"}
    //       width={100}
    //       height={100}
    //       alt="Image"
    //     />
    //   ),
    //   width: "100px",
    // },
    {
      name: "Name",
      selector: (row) => row?.name,
      width: "180px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Code",
      selector: (row) => row?.code,
      width: "90px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Tags",
      cell: (row) => row?.tags.join(", "),
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
              router.push(`/admin/product-category/category-detail/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-blue-600 hover:text-white my-2 hover:bg-blue-600 border border-blue-600 rounded transition-all duration-700"
          >
            Details
          </button>
          <button
            onClick={() =>
              router.push(`/admin/product-category/update-category/${row?._id}`)
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
  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={filterCategory || []}
        subHeader
        subHeaderComponent={SearchComponent}
        subHeaderAlign="right"
        pagination
        paginationServer
        paginationTotalRows={totalRow}
        onChangeRowsPerPage={handlePerPageChange}
        onChangePage={handlePageChange}
        paginationComponentOptions={paginationOptions}
        progressPending={isPending}
        progressComponent={<Loading />}
      />
      {openModal && (
        <DeleteProductCategory
          onSubmit={handleSubmit}
          onClose={handleClose}
          showModal={openModal}
          category={selectedCategory}
          disabled={isPending}
        />
      )}
    </div>
  );
}

export default ProductCategoryTable;
