import { defineStore } from "pinia";

export const useUtilStore = defineStore("utils", () => {
  const isMobile = () => {
    if (window) {
      return window.innerWidth <= 768;
    }
    return false;
  };

  return {
    isMobile,
  };
});
