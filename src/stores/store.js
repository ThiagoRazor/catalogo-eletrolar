// store.js
import { defineStore, createPinia } from 'pinia';

export const pinia = createPinia();

export const useFilterStore = defineStore('filter', {
  state: () => ({
    searchQuery: '',
    categoryQuery: ''
  }),
  actions: {
    initializeFromUrl() {
      const params = new URLSearchParams(window.location.search);
      this.searchQuery = params.get('filter') || '';
    },
    setSearchQuery(searchQuery) {
      this.searchQuery = searchQuery;
      this.updateUrl();
    },
    setCategoryQuery(categoryQuery) {
      this.categoryQuery = categoryQuery;
      this.updateUrl();
    },
    updateUrl() {
      const params = new URLSearchParams();
      params.set('filter', this.searchQuery);
      params.set('categoryQuery', this.categoryQuery);

      window.history.replaceState({}, '', `?${params.toString()}`);
    },
  }
});

pinia.use(store => {
  store(useFilterStore);
  store.initializeFromUrl();
});

export default pinia;
