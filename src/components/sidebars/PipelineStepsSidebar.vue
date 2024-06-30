<script lang="ts">
import { useCurrentGraphStore } from '@/stores/graph'
import { Tag } from '@causy-dev/causy-components'
import '@causy-dev/causy-components'
import IconSandclock from '@/components/icons/IconSandclock.vue'
import { useWorkspaceStore } from '@/stores/workspace'
import { ExtendedResult, Algorithm, Workspace } from '@/api/ui'
import { usePipelineSidebarStore } from '@/stores/pipelineSidebar'

type WorkspaceStoreType = ReturnType<typeof useWorkspaceStore>
type PipelineSidebarStoreType = ReturnType<typeof usePipelineSidebarStore>

interface DataProps {
  workspaceStore: WorkspaceStoreType
  pipelineStore: PipelineSidebarStoreType
}
export default {
  name: 'PipelineStepsSidebar',
  components: {
    IconSandclock,
    Tag
  },
  mounted() {
    console.log(this.pipelineStore)
    this.pipelineStore.setCurrentSteps(this.workspaceStore.algorithm, this.workspaceStore.result)
  },
  methods: {
    setCurrentStep(stepId) {
      console.log(stepId)
      this.pipelineStore.setCurrentStepID(stepId)
      this.$parent.$emit('addSidepanel', {
        name: 'action-list',
        title: 'Actions',
        component: 'ActionListSidebar'
      })
    }
  },
  props: {
    lastPanel: Boolean
  },
  emits: ['addSidepanel'],
  data(): DataProps {
    return {
      workspaceStore: useWorkspaceStore(),
      pipelineStore: usePipelineSidebarStore()
    }
  }
}
</script>

<template>
  <ul
    class="algorithm-steps"
    v-if="this.workspaceStore && this.workspaceStore.result && this.workspaceStore.algorithm"
  >
    <li
      v-for="step in this.pipelineStore.currentSteps"
      :key="step.definition.id"
      :class="{ active: step.id === this.pipelineStore.currentStepID && !this.lastPanel }"
    >
      {{ step.definition.display_name }}
      <div class="tags">
        <Tag clickable size="s" appearance="neutralLight" @click="setCurrentStep(step.id)">
          {{ step.actions.length }}
        </Tag>
        <Tag size="s" appearance="neutralDark">
          <template #start>
            <IconSandclock class="tag-icon" />
          </template>
          {{ Math.round(step.duration) }}
        </Tag>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.algorithm-steps {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.algorithm-steps li {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag-icon {
  width: 0.8rem;
  height: 0.8rem;
}

.active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
