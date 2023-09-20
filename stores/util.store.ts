import { SiteSettings } from "./../models/SiteSettings";
import { RoadMapPageData } from "./../models/roadMap/roadMap";
import { CourseCategory } from "./../models/courses/Course";
import { Article, ArticleCategory } from "./../models/articles/Article";
import { QuestionCategory } from "./../models/Question";
import { defineStore } from "pinia";

export const useUtilStore = defineStore("utils", () => {
  const questionCategories: Ref<QuestionCategory[]> = ref([]);
  const popularArticles: Ref<Article[]> = ref([]);
  const articleCategories: Ref<ArticleCategory[]> = ref([]);
  const courseCategories: Ref<CourseCategory[]> = ref([]);
  const roadMapData: Ref<RoadMapPageData | null> = ref(null);
  const siteSettings: Ref<SiteSettings | null> = ref(null);
  const globalLoading = ref(false);
  const isMobile = () => {
    if (window) {
      return window.innerWidth <= 768;
    }
    return false;
  };
  const setSiteSettings = async () => {
    if (!siteSettings.value) {
      var res = await FetchApi<SiteSettings>("/siteSettings");
      if (res.isSuccess) {
        siteSettings.value = res.data ?? null;
      }
    }
  };

  return {
    isMobile,
    questionCategories,
    popularArticles,
    articleCategories,
    courseCategories,
    roadMapData,
    siteSettings,
    setSiteSettings,
    globalLoading
  };
});
