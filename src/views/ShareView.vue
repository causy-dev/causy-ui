<script lang="ts">
import Graph from "@/components/Graph.vue";
import {V1Service} from "@/api/share";
import PipelineStepsSidebar from "@/components/PipelineStepsSidebar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {useCurrentGraphStore} from "@/stores/graph";
import type {CausyModel} from "@/api/ui";
import type {ShareResponse} from "@/api/share";


interface DataProps {
  graph: CausyModel | null;
  shareDetails: ShareResponse;
  sidebarVisible: boolean;
  graphShareId: string | null;
}
export default {
  name: "ShareView",
  components: {
    LoadingSpinner,
    PipelineStepsSidebar,
    Graph,
  },
  mounted() {
    this.graphShareId = this.$route.params.id;
    const graphStore = useCurrentGraphStore();
    V1Service.getShareV1ShareShareIdGet(this.graphShareId).then(response => {
      this.graph = response.data;
      this.shareDetails = response;
      console.log(this.graph);
      graphStore.setGraph(this.graph);
      console.log(graphStore.currentGraph);
    });
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
  data(): DataProps {
    return {
      graph: null,
      sidebarVisible: false,
      graphShareId: null,
      shareDetails: null,
    };
  },
}
</script>

<template>
  <header>
    <div class="graph-name" v-if="graph">
      <a class="label medium" @click="toggleSidebar()">{{graph.algorithm.reference}}</a>
    </div>
    <div class="align-right" v-if="shareDetails">
      <span class="medium">Available until: {{shareDetails.valid_until}}</span>
    </div>
  </header>
  <PipelineStepsSidebar v-if="graph && sidebarVisible" />
  <main v-if="graph !== null">
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
