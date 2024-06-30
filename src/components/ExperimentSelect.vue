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
      <option v-for="version in selectedExperimentVersions" :key="version" :value="version.value">
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
      useWorkspaceStore().setExperiment(newExperiment)
      this.selectedVersion = useWorkspaceStore().currentExperimentVersion
    },
    selectedVersion(newVersion) {
      useWorkspaceStore().setExperimentVersion(this.selectedExperiment, newVersion)
    }
  }
}
</script>

<style scoped>
.experiment-select {
  padding: 8px;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  border-color: #333;
  font-weight: 600;
}
</style>
