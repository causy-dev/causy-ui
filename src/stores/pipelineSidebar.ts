import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type {
  Algorithm,
  ExtendedExperiment,
  AlgorithmReferenceType,
  ExtendedResult
} from '@/api/ui'

interface Step {
  actions: any[]
  definition: {
    display_name: string
    description: string
  }
  duration: number
  id: string
}

export const usePipelineSidebarStore = defineStore('pipelineSidebarStore', {
  state: () => ({
    activeStepID: null as string | null,
    steps: null as Step[] | null,
    activeAction: null as any | null
  }),
  getters: {
    currentStepID: (state) => state.activeStepID,
    currentActiveAction: (state) => state.activeAction,
    currentSteps: (state) => state.steps,
    currentStep: (state) => {
      if (state.activeStepID === null || state.steps === null) {
        return null
      }
      for (const step of state.steps) {
        if (step.id === state.activeStepID) {
          return step
        }
      }
      return null
    }
  },
  actions: {
    setCurrentStepID(step: any) {
      this.activeStepID = step
    },
    setCurrentAction(action: any) {
      this.activeAction = action
    },
    setCurrentSteps(algorithm: Algorithm, result: ExtendedResult) {
      if (
        algorithm === null ||
        algorithm.pipeline_steps === null ||
        result.action_history === null
      ) {
        return
      }

      const mergedSteps = []
      const availableSteps = []
      for (const step of algorithm.pipeline_steps) {
        // TODO add substeps here too
        availableSteps.push(step)
      }
      console.log(availableSteps)
      for (const step of result.action_history) {
        let algoStepDefinition = null
        for (const algoStep in availableSteps) {
          if (availableSteps[algoStep].name === step.name) {
            algoStepDefinition = availableSteps[algoStep]
            availableSteps.splice(algoStep, 1)
            break
          }
        }

        if (algoStepDefinition === null) {
          algoStepDefinition = {
            display_name: step.name,
            description: 'No description available'
          }
        }
        mergedSteps.push({
          actions: step.actions,
          definition: algoStepDefinition,
          duration: step.duration,
          id: uuidv4()
        })
      }
      console.log(mergedSteps)
      this.steps = mergedSteps
    }
  }
})
