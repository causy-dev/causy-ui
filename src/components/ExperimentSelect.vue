<template>
  <div>
    <select v-model="selectedExperiment" class="experiment-select" style="margin-right: 8px">
      <option disabled value="">Please select an experiment</option>
      <option v-for="experiment in experiments" :key="experiment.id" :value="experiment.name">
        {{ experiment.name }}
      </option>
    </select>
    <select v-model="selectedVersion" class="experiment-select">
      <option disabled value="">Please select a version</option>
      <option v-for="version in selectedExperimentVersions" :key="version" :value="version.version">
        {{ version.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useWorkspaceStore } from '@/stores/workspace'

export default {
  name: 'ExperimentSelect',
  data() {
    return {
      selectedExperiment: useWorkspaceStore().currentExperiment.name,
      selectedVersion: useWorkspaceStore().currentExperimentVersion
    }
  },
  computed: {
    experiments() {
      return useWorkspaceStore().currentExperiments
    },
    selectedExperimentVersions() {
      const experiment = this.experiments.find((e) => e.name === this.selectedExperiment)
      return experiment ? experiment.versions : []
    }
  },
  watch: {
    selectedExperiment(newExperiment) {
      useWorkspaceStore().setExperiment(newExperiment).then(() => {
        this.selectedVersion = useWorkspaceStore().currentExperimentVersion
      })
    },
    selectedVersion(newVersion) {
      useWorkspaceStore().setExperimentVersion(this.selectedExperiment, newVersion)
    }
  }
}
</script>

<style scoped>
.experiment-select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 8px;
  padding-right: 20px;
  border-radius: 5px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%239368e6'><polygon points='0,0 100,0 50,50'/></svg>")  no-repeat 95% 60%;
  background-size: 8px 10px;
  background-color: #333;
  color: #fff;
  border-color: #333;
  font-weight: 600;

}
</style>
