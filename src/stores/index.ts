import { StoresNamespaces } from '@/enums/general.routes'
import { defineStore } from 'pinia'
import { useState } from './state'
import { toRefs } from 'vue'

export const useGeneralStore = defineStore(StoresNamespaces.GENERAL, () => {
  const state = useState()
  return {
    ...toRefs(state)
  }
})
