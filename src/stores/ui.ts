import { defineStore } from 'pinia'
import { ApiService } from '@/api/ui/services/ApiService'
import type { Workspace, Experiment, Status } from '@/api/ui'

export const useUIStore = defineStore('ui', {
  state: () => ({
    status: null as Status | null
  }),
  getters: {
    currentStatus: (state) => state.status
  },
  actions: {
    fetchStatus() {
      return ApiService.getStatusApiV1StatusGet().then((response) => {
        this.status = response
        return response
      })
    }
  }
})
