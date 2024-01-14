const { create } = require("zustand");

const AdminNav = create((set) => ({
  navActive: "",
  setNavActive: (navActive) => {
    set({ navActive });
  },
}));
export default AdminNav