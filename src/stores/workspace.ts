import { defineStore } from 'pinia'
import { ApiService } from '@/api/ui/services/ApiService'
import type { Workspace, Experiment, Status, ExtendedResult, ExtendedExperiment } from '@/api/ui'
import { AlgorithmReferenceType } from '@/api/ui'
import {useCurrentGraphStore} from "@/stores/graph";

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspace: null as Workspace | null,
    experiments: null as ExtendedExperiment[] | null,
    experiment: null as ExtendedExperiment | null,
    result: null as ExtendedResult | null,
    algorithm: null as Algorithm | null
  }),
  getters: {
    currentWorkspace: (state) => state.workspace,
    currentExperiments: (state) => state.experiments,
    currentExperiment: (state) => state.experiment,
    currentExperimentName: (state) => state.experiment?.name,
    currentExperimentVersion: (state) => state.result?.version,
    currentResult: (state) => state.result,
    currentAlgorithm: (state) => state.algorithm
  },
  actions: {
    fetchWorkspace() {
      return ApiService.getWorkspaceApiV1WorkspaceGet().then((response) => {
        this.workspace = response
        return response
      })
    },
    fetchExperiments() {
      return ApiService.getExperimentsApiV1ExperimentsGet().then((response) => {
        this.experiments = response
        const availableExperimentNames = this.experiments.map((experiment) => experiment.name)
        if (
          (response.length > 0 && this.experiment == null) ||
          !availableExperimentNames.includes(this.currentExperiment.name)
        ) {
          this.setExperiment(response[0].name)
        }
        return response
      })
    },
    setExperiment(experimentName: string) {
      this.experiment = this.experiments.find((experiment) => experiment.name === experimentName)
      return ApiService.getLatestExperimentApiV1ExperimentsExperimentNameLatestGet(
        this.experiment.name
      ).then((response) => {
        this.setCurrentResult(response)
      })
    },
    setExperimentVersion(experimentName: string, version: number) {
      this.experiment = this.experiments.find((experiment) => experiment.name === experimentName)
      return ApiService.getExperimentApiV1ExperimentsExperimentNameVersionNumberGet(
        this.experiment.name,
        version
      ).then((response) => {
        this.setCurrentResult(response)
      })
    },
    setCurrentResult(result: ExtendedResult) {
      this.result = result
      useCurrentGraphStore().setGraph(result)
      this.fetchAlgorithm(result.algorithm.type, result.algorithm.reference)
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
