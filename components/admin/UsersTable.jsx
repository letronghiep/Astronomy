"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { delete_user_by_id, get_all_user } from "~/services/auth";
import Filter from "../partials/filter";
import DataTable from "react-data-table-component";
import Loading from "~/components/loading";
import DeleteUser from "../modal/DeleteUser";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAdminNav from "~/hooks/useAdminNav";
import useFilterStore from "~/hooks/useFilterStore";

function UsersTable() {
  const router = useRouter();
  const adminNav = useAdminNav();
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
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idSelected, setIdSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userRow, setUserRow] = useState();
  async function fetchUser() {
    try {
      const data = await get_all_user(perPage, sort, currentPage);
      if (data) {
        setUsers(data.data);
        setCurrentPage(data.currentPage);
        setTotalPage(data.totalPages);
        setTotalRow(data.totalRow);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }
  useEffect(() => {
    fetchUser();
  }, [perPage, sort, currentPage]);
  useEffect(() => {
    setFilterData(users);
  }, [users]);
  useEffect(() => {
    if (search === "") {
      setFilterData(users);
    } else {
      const filteredData = users?.filter(
        (item) =>
          item?.firstname.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      setFilterData(filteredData);
    }
  }, [search, users]);
  const paginationOptions = {
    rowsPerPageText: "Row per page: ",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleOpenModal = (id, row) => {
    setOpenModal(true);
    setIdSelected(id);
    setUserRow(row);
  };
  const columns = [
    {
      name: "First Name",
      selector: (row) => row?.firstname,
      width: "120px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Last Name",
      selector: (row) => row?.lastname,
      width: "120px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },

    {
      name: "Email",
      cell: (row) => row?.email,
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Phone",
      cell: (row) => row?.phone,
      width: "120px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Roles",
      cell: (row) => Object.keys(row?.roles).join(", "),
      width: "120px",
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
    {
      name: "Status",
      cell: (row) => (row?.isBlocked === true ? "Blocked" : "Un Blocked"),
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
            onClick={() => router.push(`/admin/users/user-detail/${row?._id}`)}
            className=" w-20 py-2 mx-2 text-xs text-blue-600 hover:text-white my-2 hover:bg-blue-600 border border-blue-600 rounded transition-all duration-700"
          >
            Details
          </button>
          <button
            onClick={() => router.push(`/admin/users/update-user/${row?._id}`)}
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
      headerStyle: () => {
        return { textAlign: "center" }; // removed partial line here
      },
    },
  ];
  const SearchComponent = (
    <div className="flex justify-between mb-4 flex-col md:flex-row gap-2 my-2">
      <Button
        href="/admin/users/add-user"
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
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
  const handleSubmit = async () => {
    try {
      const res = await delete_user_by_id(idSelected);
      if (res) {
        toast.success("Deleted successfully");
      } else {
        toast.error("Error deleting user");
      }
      setTimeout(() => {
        setOpenModal(false);
      }, 5000);
      await fetchUser();
      adminNav.setNavActive("Users");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="container mx-auto">
      <DataTable
        className=""
        columns={columns}
        data={filterData || []}
        subHeader
        subHeaderComponent={SearchComponent}
        subHeaderAlign="right"
        pagination
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[5, 10, 30, 40, 50]}
        paginationServer
        paginationTotalRows={totalRow}
        onChangeRowsPerPage={handlePerPageChange}
        paginationComponentOptions={paginationOptions}
        progressPending={isLoading}
        progressComponent={<Loading />}
        responsive={true}
      />
      {openModal && (
        <DeleteUser
          onSubmit={handleSubmit}
          onClose={handleClose}
          data={userRow}
          disabled={isLoading}
          showModal={openModal}
        />
      )}
    </div>
  );
}

export default UsersTable;
