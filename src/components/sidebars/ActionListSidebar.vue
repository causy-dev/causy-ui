<script lang="ts">
import { usePipelineSidebarStore } from '@/stores/pipelineSidebar'
import { Tag } from '@causy-dev/causy-components'
import '@causy-dev/causy-components'
type PipelineSidebarStoreType = ReturnType<typeof usePipelineSidebarStore>

interface DataProps {
  pipelineStore: PipelineSidebarStoreType
}
export default {
  name: 'ActionListSidebar',
  components: {
    Tag
  },
  emits: ['addSidepanel'],
  props: {
    lastPanel: Boolean
  },
  data(): DataProps {
    return {
      pipelineStore: usePipelineSidebarStore()
    }
  },
  methods: {
    setCurrentAction(action) {
      this.pipelineStore.setCurrentAction(action)
      this.$parent.$emit('addSidepanel', {
        name: 'action-json',
        title: 'Action Detail',
        component: 'PipelineStepJSON'
      })
    }
  },
  computed: {
    actions() {
      // filter actions based on the current step
    }
  }
}
</script>

<template>
  <ul class="algorithm-steps" v-if="this.pipelineStore">
    <li
      v-for="action in this.pipelineStore.currentStep.actions"
      :key="action"
      :class="{ active: action === this.pipelineStore.currentActiveAction && !this.lastPanel }"
    >
      {{ action.u.name }} ⭤ {{ action.v.name }}
      <br />
      {{ action.action }} ({{ action.data }})
      <div class="tags">
        <Tag clickable size="s" appearance="neutralLight" @click="setCurrentAction(action)">
          {…}
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
.active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
