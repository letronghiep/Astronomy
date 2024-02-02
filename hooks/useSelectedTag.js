const { create } = require("zustand");

const useSelectedTag = create((set) => ({
  tags: [],
  selectedTags: [],
  setTags: (tags) => {
    set({ tags: tags });
  },
  setSelectedTags: (selectedTags) => {
    set({ selectedTags: selectedTags });
  },
}));
export default useSelectedTag;
