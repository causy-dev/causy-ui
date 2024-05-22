<script lang="ts">
import Graph from "@/components/Graph.vue";
import {V1Service} from "@/api/share";
import PipelineStepsSidebar from "@/components/PipelineStepsSidebar.vue";
import {useCurrentGraphStore} from "@/stores/graph";
import type {ExtendedResult as CausyModel } from "@/api/ui" ;
import type {ShareResponse} from "@/api/share";
import {Header, Spinner} from "@causy-dev/causy-components";


interface DataProps {
  graph: CausyModel | null;
  shareDetails: ShareResponse;
  sidebarVisible: boolean;
  graphShareId: string | null;
}
export default {
  name: "ShareView",
  components: {
    Header,
    Spinner,
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
  <Header class="header" size="s">
    <div class="graph-name" v-if="graph">
      <a class="label medium" @click="toggleSidebar()">{{graph.algorithm.reference}}</a>
    </div>
    <div class="align-right" v-if="shareDetails">
      <span class="medium">Available until: {{shareDetails.valid_until}}</span>
    </div>
  </Header>
  <PipelineStepsSidebar v-if="graph && sidebarVisible" />
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
