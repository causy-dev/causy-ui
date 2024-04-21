<script lang="ts">
import Graph from "@/components/Graph.vue";
import {ApiService} from "@/api/ui";
import PipelineStepsSidebar from "@/components/PipelineStepsSidebar.vue";
import ShareGraph from "@/components/ShareGraph.vue";
import {useCurrentGraphStore} from "@/stores/graph";
import type {CausyModel} from "@/api/ui";
import {Header, Spinner} from "@causy-dev/causy-components";

interface DataProps {
  graph: CausyModel | null;
  sidebarVisible: boolean;
  shareVisible: boolean;
}
export default {
  name: "HomeView",
  components: {
    ShareGraph,
    Spinner,
    PipelineStepsSidebar,
    Graph,
    Header
  },

  mounted() {
    const graphStore = useCurrentGraphStore();
    ApiService.getModelApiV1ModelGet().then(response => {
      this.graph = response;
      graphStore.setGraph(this.graph);
      console.log(graphStore.currentGraph);
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
  data(): DataProps {
    return {
      graph: null,
      sidebarVisible: false,
      shareVisible: false,
    };
  },
}
</script>

<template>
  <Header class="header">
    <div class="graph-name" v-if="graph">
      <a class="label medium" @click="toggleSidebar()">{{graph.algorithm.reference}}</a>
    </div>
    <div class="align-right">
      <a class="label medium" @click="toggleShare()">Share</a>
    </div>
  </Header>
  <PipelineStepsSidebar v-if="graph && sidebarVisible" />
  <ShareGraph v-if="graph && shareVisible" @toggleShare="toggleShare()" />
  <main v-if="graph !== null">
    <Graph :graph="graph" />
  </main>
  <main v-else>
    <div class="loading">
      <Spinner>Loading model...</Spinner>
    </div>
  </main>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}

.header {
  padding: 0 2rem;
  height: 4rem;
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
