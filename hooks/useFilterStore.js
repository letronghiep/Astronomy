const { create } = require("zustand");

const useFilterStore = create((set) => ({
  sort: "a_z",
  perPage: 10,
  currentPage: 1,
  totalPages: 1,
  totalRow: 1,
  setSort: (sort) => set({ sort: sort }),
  setPerPage: (perPage) => set({ perPage: perPage }),
  setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
  setTotalPage: (totalPages) => set({ totalPages: totalPages }),
  setTotalRow: (totalRow) => set({ totalRow: totalRow }),
}));
export default useFilterStore;
