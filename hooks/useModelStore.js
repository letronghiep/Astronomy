const { create } = require("zustand");

const useRentModal = create((set) => ({
  id: "",
  category: {},
  isOpen: false,
  article: {},
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (id) => set({ id: id }),
  setCategory: (category) => set({ category: category }),
  setArticle: (article) => set({ article: article }),
}));
export default useRentModal;
