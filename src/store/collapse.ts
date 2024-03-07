import { defineStore } from 'pinia'

export const useCollapseStore = defineStore('collapse', {
  state: () => ({
    collapse: false
  }),
  actions: {
    setCollapse(newLocale: boolean) {
      this.collapse = newLocale
    }
  }
})
