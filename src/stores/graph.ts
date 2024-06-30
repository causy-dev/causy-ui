import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ApiService } from '@/api/ui/services/ApiService'
import type {
  Algorithm,
  ExtendedExperiment,
  AlgorithmReferenceType,
  ExtendedResult
} from '@/api/ui'

export const useCurrentGraphStore = defineStore('currentGraph', {
  state: () => ({
    graph: null as ExtendedResult | null,
    algorithm: null as Algorithm | null
  }),
  getters: {
    currentGraph: (state) => state.graph,
    currentAlgorithm: (state) => state.algorithm,
    currentAlgorithmExtensionConfig: (state, extensionName: string) => {
      for (let extension of state.algorithm?.extensions || []) {
        if (extension.name === extensionName) {
          return extension.config
        }
      }
    }
  },
  actions: {
    setGraph(graph: ExtendedResult) {
      this.graph = graph
    },
    fetchGraph() {
      return ApiService.getModelApiV1ModelGet().then((response) => {
        this.graph = response
        return response
      })
    },
    fetchAlgorithm(algorithmReferenceType: AlgorithmReferenceType, algorithmReference: string) {
      return ApiService.getAlgorithmApiV1AlgorithmReferenceTypeReferenceGet(
        algorithmReferenceType,
        algorithmReference
      ).then((response) => {
        this.algorithm = response
        console.log(response)
        return response
      })
    }
  }
})
