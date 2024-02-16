"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import useAdminNav from "~/hooks/useAdminNav";
import useFilterStore from "~/hooks/useFilterStore";
import useRentModal from "~/hooks/useModelStore";
import { delete_event, search_event } from "~/services/event";
import Filter from "../partials/filter";
import { Button } from "@mui/material";
import { HiOutlineExclamationCircle, HiPlusCircle } from "react-icons/hi";
import Loading from "../loading";
import Link from "next/link";
import { Modal } from "flowbite-react";

function EventTable() {
  const router = useRouter();
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
  } = useFilterStore();
  const rentModal = useRentModal();
  const { setNavActive } = useAdminNav();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState();
  const [filterText, setFilterText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [eventSelected, setEventSelected] = useState();
  const fetchDataFunction = async () => {
    try {
      const res = await search_event(perPage, sort, currentPage);
      if (res) {
        setData(res.data);
        setCurrentPage(res.currentPage);
        setTotalRow(res.totalRow);
        setTotalPage(res.totalPages);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchDataFunction();
  }, [perPage, sort, currentPage]);

  const paginationOptions = {
    rowsPerPageText: "Row per page: ",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };
  const handleOpenModal = (id, row) => {
    setOpenModal(true);
    setIdSelected(id);
    setEventSelected(row);
  };
  // Function
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSubmit = async () => {
    try {
      await delete_event(idSelected);
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
      name: "Name",
      selector: (row) => row?.name,
      maxWidth: "180px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Location",
      cell: (row) => row?.location,
      maxWidth: "140px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Start date",
      selector: (row) => new Date(row?.startDate).toLocaleDateString(),
      maxWidth: "120px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "End date",
      selector: (row) => new Date(row?.endDate).toLocaleDateString(),
      maxWidth: "120px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Organizer",
      selector: (row) => row?.organizer,
      maxWidth: "140px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Website",
      cell: (row) => (
        <Link href={`${row?.website}`} target="_blank">
          {row?.website.slice(0, 60) + "..."}
        </Link>
      ),
      width: "",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-start px-2 h-20">
          <button
            onClick={() => router.push(`/admin/event/event-detail/${row?._id}`)}
            className=" w-20 py-2 mx-2 text-xs text-blue-600 hover:text-white my-2 hover:bg-blue-600 border border-blue-600 rounded transition-all duration-700"
          >
            Details
          </button>
          <button
            onClick={() => router.push(`/admin/event/update-event/${row?._id}`)}
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
  // Filter data
  const filterData = useMemo(() => {
    return !filterText
      ? data
      : data.filter(
          (item) =>
            item.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1
        );
  }, [filterText, data]);

  // Search Component
  const SearchComponent = (
    <div className="flex justify-between mb-4 flex-col md:flex-row gap-2 my-2 items-center">
      <div className="flex gap-x-2 ">
        <Button
          href="/admin/event/add-event"
          endIcon={<HiPlusCircle />}
          className=""
        >
          Add
        </Button>
        <Filter />
      </div>
      <input
        type="search"
        className="rounded-md border-0 py-1.5 w-[300px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
        placeholder="Search Name"
        onChange={handleSearchInput}
        value={searchInput}
      />
    </div>
  );
  return (
    <div className="container px-4 mx-auto">
      <DataTable
        columns={columns}
        data={filterData || []}
        pagination
        paginationServer
        paginationTotalRows={totalRow}
        subHeader
        subHeaderComponent={SearchComponent}
        onChangeRowsPerPage={handlePerPageChange}
        onChangePage={handlePageChange}
        paginationComponentOptions={paginationOptions}
        progressPending={isPending}
        progressComponent={<Loading />}
      />
      {openModal && (
        <Modal
          className="w-full "
          size="md"
          dismissible
          show={openModal}
          onClose={handleClose}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this event?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-red-500 text-white hover:opacity-90 hover:text-white hover:bg-red-500"
                  onClick={handleSubmit}
                >
                  Yes
                </Button>
                <Button
                  className="bg-gray-400 text-white hover:opacity-90 hover:text-white hover:bg-gray-400"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default EventTable;
