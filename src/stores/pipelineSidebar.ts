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
      for (let step of state.steps) {
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

      let mergedSteps = []
      let availableSteps = []
      for (let step of algorithm.pipeline_steps) {
        availableSteps.push(step)
      }
      for (let step of result.action_history) {
        let algoStepDefinition = null
        for (let algoStep in availableSteps) {
          if (availableSteps[algoStep].name === step.name) {
            console.log(availableSteps[algoStep].name)
            console.log(availableSteps[algoStep])
            algoStepDefinition = availableSteps[algoStep]
            console.log(algoStepDefinition)
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
