import { Article } from './../models/articles/Article';
import { QuestionCategory } from "./../models/Question";
import { defineStore } from "pinia";

export const useUtilStore = defineStore("utils", () => {
  const questionCategories: Ref<QuestionCategory[]> = ref([]);
  const popularArticles: Ref<Article[]> = ref([]);

  const isMobile = () => {
    if (window) {
      return window.innerWidth <= 768;
    }
    return false;
  };

  return {
    isMobile,
    questionCategories,
    popularArticles
  };
});
