const { create } = require("zustand");

const useSelectedCategory = create((set) => ({
  category: null,
  selectedCategory: null,
  setCategory: (category) => set({ category }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));

export default useSelectedCategory