<script lang="ts">
import Graph from "@/components/Graph.vue";
import {ApiService} from "@/api/ui";
import PipelineStepsSidebar from "@/components/PipelineStepsSidebar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ShareGraph from "@/components/ShareGraph.vue";
export default {
  name: "HomeView",
  components: {
    ShareGraph,
    LoadingSpinner,
    PipelineStepsSidebar,
    Graph,
  },

  mounted() {
    ApiService.getModelApiV1ModelGet().then(response => {
      this.graph = response;
    });
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleShare() {
      this.shareVisible = !this.shareVisible;
    },
  },
  data() {
    return {
      graph: null,
      sidebarVisible: false,
      shareVisible: false,
    };
  },
}
</script>

<template>
  <header>
    <div class="graph-name" v-if="this.graph">
      <a class="label medium" @click="toggleSidebar()">{{this.graph.algorithm.reference}}</a>
    </div>
    <div class="align-right">
      <a class="label medium" @click="toggleShare()">Share</a>
    </div>
  </header>
  <PipelineStepsSidebar v-if="this.graph && this.sidebarVisible" />
  <ShareGraph v-if="this.graph && this.shareVisible" @toggleShare="toggleShare()" />
  <main v-if="this.graph !== null">
    <Graph :graph="graph" />
  </main>
  <main v-else>
    <LoadingSpinner text="Loading model..." />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: left;
  padding: 0 2rem;
  align-items: center;
  height: 4rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  width: 100%;
  position: fixed;
  background-color: #008B8BFF;
}
.label {
  font-family: "Open-Sans-Regular", sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #333;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.label.small {
  font-size: 0.8rem;
  font-weight: normal;
}

.label.medium {
  font-size: 1rem;
  font-weight: bold;
}

.label.large {
  font-size: 1.2rem;
  font-weight: bold;
}

a.label {
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  user-select: none;
}

a.label:focus, a.label:hover {
  outline: none;
  background-color: #555;

}
.label:focus{
  outline: #fff 2px solid ;
}

.align-right {
  margin-left: auto;
}

</style>
