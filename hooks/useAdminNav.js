const { create } = require("zustand");

const useAdminNav = create((set) => ({
  navActive: "",
  setNavActive: (navActive) => {
    set({ navActive });
  },
}));
export default useAdminNav