<script lang="ts">
export default {
  name: 'SidebarContainer',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-header-title">{{ title }}</div>
    </div>
    <section class="sidebar-content">
      <slot></slot>
    </section>
  </aside>
</template>



<style scoped>
.sidebar {
  position: fixed;
  top: 3rem;
  left: 4rem;
  bottom: 0;
  width: 22rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  color: #000;
  padding: 0rem;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 3rem;
  border-bottom: 1px solid #eee;
  padding: 1.5rem 1rem;
}

.sidebar-header-title {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: "Open-Sans-Bold", sans-serif;
}
</style>
