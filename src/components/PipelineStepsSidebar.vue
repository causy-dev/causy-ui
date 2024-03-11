<script lang="ts">


export default {
  name: "PipelineStepsSidebar",
  props: {
    graph: Object,
  },
};

</script>

<template>
<aside>
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-header-title">Pipeline Steps</div>
    </div>
    <section class="sidebar-content">
      <ul class="algorithm-steps">
        <li v-for="step in this.graph.steps">
          {{step.step}} <span class="label small">{{step.actions.length}}</span>
        </li>
      </ul>
    </section>
  </div>
</aside>
</template>

<style scoped>


aside {
  position: fixed;
  top: 4rem;
  left: 0;
  bottom: 0;
  width: 22rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  color: #000;
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 4rem;
  border-bottom: 1px solid #eee;
  padding: 0.5rem 1rem;
}

.sidebar-header-title {
  font-size: 1.2rem;
  font-weight: bold;
  font-family: "Open-Sans-Bold", sans-serif;
}

.algorithm-steps {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.algorithm-steps li {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
}

</style>
