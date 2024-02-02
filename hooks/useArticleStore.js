const { create } = require("zustand");

const useArticleStore = create((set) => ({
  articles: [],
  articleLoading: false,
  articleCategory: [],
  articleCategoryLoading: false,

  setArticles: (articles) => {
    set({ articles: articles });
  },
  setArticleCategory: (articleCategory) => {
    set({ articleCategory: articleCategory });
  },
  setArticleLoading: (articleLoading) => {
    set({ articleLoading });
  },
  setArticleCategoryLoading: (articleCategoryLoading) => {
    set({ articleCategoryLoading });
  },
}));
export default useArticleStore;
