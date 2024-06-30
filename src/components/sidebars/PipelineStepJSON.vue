<script lang="ts">
import { usePipelineSidebarStore } from '@/stores/pipelineSidebar'
import { Tag } from '@causy-dev/causy-components'
import '@causy-dev/causy-components'
type PipelineSidebarStoreType = ReturnType<typeof usePipelineSidebarStore>

interface DataProps {
  pipelineStore: PipelineSidebarStoreType
  lastPanel: boolean
}
export default {
  name: 'PipelineStepJSON',
  components: {
    Tag
  },
  emits: ['addSidepanel'],
  props: {
    lastPanel: Boolean
  },
  data(): DataProps {
    return {
      pipelineStore: usePipelineSidebarStore(),
      lastPanel: true
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
  <VCodeBlock
    v-if="pipelineStore.currentActiveAction"
    :code="JSON.stringify(pipelineStore.currentActiveAction, null, 2)"
    highlightjs
    lang="json"
    theme="vs"
    class="editor"
  />
</template>

<style>
pre {
  white-space: pre-wrap;
}
.editor {
  border-radius: 0rem !important;
}
.editor .hljs {
  background-color: rgba(255, 255, 255, 0) !important;
}
.editor .v-code-block--tab-highlightjs-vs-icon {
  color: hsl(var(--colorPrimary5)) !important;
  fill: hsl(var(--colorPrimary5)) !important;
}
</style>
