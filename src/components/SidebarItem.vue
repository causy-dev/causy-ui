<script lang="ts">
import IconClose from '@/components/icons/IconClose.vue'

export default {
  name: 'SidebarItem',
  components: { IconClose },
  emits: ['close', 'addSidepanel'],
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-header-title">{{ title }}</div>
      <div class="sidebar-header-actions">
        <slot name="actions"
          ><IconClose class="sidebar-header-actions-close" @click="$emit('close')"
        /></slot>
      </div>
    </div>
    <section class="sidebar-content">
      <slot></slot>
    </section>
  </aside>
</template>

<style scoped>
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 3rem;
  border-bottom: 1px solid #eee;
  padding: 1.5rem 1rem;
  position: sticky;
  top: 0px;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1000;
}

.sidebar-header-title {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Open-Sans-Bold', sans-serif;
  position: sticky;
  top: 0px;
}

.sidebar {
  width: 22rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 100;
  color: #000;
  padding: 0rem;
  overflow-y: auto;
  height: 100%;
}

.sidebar:nth-of-type(1) {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.sidebar:nth-of-type(2) {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.sidebar:nth-of-type(3) {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
}

.sidebar:nth-of-type(4) {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.sidebar-header-actions {
  margin-left: auto;
}

.sidebar-header-actions-close {
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  fill: #000;
  margin-top: 0.75rem;
}
</style>
