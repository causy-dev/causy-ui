<script lang="ts">
import PipelineStepsSidebar from '@/components/sidebars/PipelineStepsSidebar.vue'
import SidebarItem from '@/components/SidebarItem.vue'
import ActionListSidebar from '@/components/sidebars/ActionListSidebar.vue'
import PipelineStepJSON from '@/components/sidebars/PipelineStepJSON.vue'
export default {
  name: 'SidebarContainer',
  components: {
    PipelineStepsSidebar,
    ActionListSidebar,
    SidebarItem,
    PipelineStepJSON
  },
  emits: ['close', 'addSidepanel'],
  props: {
    sidePanels: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClose(panel) {
      const index = this.sidePanels.indexOf(panel)
      console.log(index)
      this.$emit('close', index)
    },
    handleAddSidepanel(details) {
      this.$emit('addSidepanel', details)
    }
  }
}
</script>

<template>
  <div class="sidebar-container" v-if="sidePanels.length > 0">
    <SidebarItem
      v-for="panel in sidePanels"
      :key="panel.name"
      :title="panel.title"
      @close="handleClose(panel)"
      @addSidepanel="handleAddSidepanel"
    >
      <component :is="panel.component" :lastPanel="sidePanels[sidePanels.length - 1] === panel" />
    </SidebarItem>
  </div>
</template>

<style scoped>
.sidebar-container {
  position: fixed;
  top: 3rem;
  left: 4rem;
  bottom: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 0rem;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
}

.sidebar-container > * {
  flex: 1;
}

.sidebar-container > * {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.sidebar-container > *:nth-child(2) {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.sidebar-container > *:nth-child(3) {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

}
</style>
