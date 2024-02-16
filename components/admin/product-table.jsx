"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { HiPlusCircle } from "react-icons/hi";
import Loading from "~/components/loading";
import useRentModal from "~/hooks/useModelStore";
import useAdminNav from "~/hooks/useAdminNav";
import Filter from "../partials/filter";
import { Button } from "@mui/material";
import { delete_product_by_id, get_all_product } from "~/services/products";
import useFilterStore from "~/hooks/useFilterStore";
import DeleteProduct from "../modal/delete-product";
import { toast } from "react-toastify";

function ProductsTable() {
  const router = useRouter();
  const adminNav = useAdminNav();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const { sort, perPage, currentPage, totalRow, setCurrentPage, setPerPage } =
    useFilterStore();
  const fetchDataFunction = async () => {
    try {
      const res = await get_all_product();
      const result = await res;

      setData(result);
      //   setTotalRow(result.totalRow);
      //   setTotalPage(result.totalPages);
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
    setProductSelected(row);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSubmit = async () => {
    try {
      const result = await delete_product_by_id(idSelected);
      if (result) {
        toast.success("Deleted successfully");
        setTimeout(() => {
          setOpenModal(false);
        }, 5000);
        await fetchDataFunction();
        adminNav.setNavActive("Products");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const SearchComponent = (
    <div className="flex justify-between mb-4 flex-col md:flex-row gap-2 my-2">
      <Button
        href="/admin/products/add-product"
        endIcon={<HiPlusCircle />}
        className=""
      >
        Add
      </Button>
      <Filter />
      <input
        type="search"
        className="rounded-md border-0 py-1.5 w-[300px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ml-auto"
        placeholder="Search Name"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
  const handleClose = () => {
    setOpenModal(false);
  };
  const columns = [
    {
      name: "Category",
      selector: (row) => row?.category?.name,
      width: "180px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Name",
      cell: (row) => row?.name,
    },
    {
      name: "Stock Quantity",
      cell: (row) => row?.stockQuantity,
      width: "160px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Price",
      cell: (row) => row?.price,
      width: "100px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Description",
      cell: (row) =>
        row?.description?.length > 120
          ? row?.description.substring(0, 120) + "..."
          : row?.description,
      wrap: true,
      width: "180px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-start px-2 h-20">
          <button
            onClick={() =>
              router.push(`/admin/products/product-detail/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-blue-600 hover:text-white my-2 hover:bg-blue-600 border border-blue-600 rounded transition-all duration-700"
          >
            Details
          </button>
          <button
            onClick={() =>
              router.push(`/admin/products/update-product/${row?._id}`)
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
        <DeleteProduct
          onSubmit={handleSubmit}
          onClose={handleClose}
          data={productSelected}
          disabled={isLoading}
          showModal={openModal}
        />
      )}
    </div>
  );
}

export default ProductsTable;
