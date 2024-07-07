<script lang="ts">
import Graph from '@/components/Graph.vue'
import { V1Service } from '@/api/share'
import PipelineStepsSidebar from '@/components/sidebars/PipelineStepsSidebar.vue'
import { useCurrentGraphStore } from '@/stores/graph'
import type { ExtendedResult as CausyModel } from '@/api/ui'
import type { ShareResponse } from '@/api/share'
import { Header, Spinner } from '@causy-dev/causy-components'
import EdgeDetails from "@/components/EdgeDetails.vue";
import {useEdgeDetailsStore} from "@/stores/edgeDetails";

interface DataProps {
  graph: CausyModel | null
  shareDetails: ShareResponse
  sidebarVisible: boolean
  graphShareId: string | null
  edgeDetailsStore: any

}
export default {
  name: 'ShareView',
  components: {
    EdgeDetails,
    Header,
    Spinner,
    PipelineStepsSidebar,
    Graph
  },
  mounted() {
    this.graphShareId = this.$route.params.id
    this.graphStore = useCurrentGraphStore()
    V1Service.getShareV1ShareShareIdGet(this.graphShareId).then((response) => {
      this.graph = response.data
      this.shareDetails = response
      console.log(this.graph)
      this.graphStore.setGraph(this.graph)
      this.graphStore.setAlgorithm(response.algorithm)
      console.log(this.graphStore.currentGraph)
    })
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible
    }
  },
  data(): DataProps {
    return {
      graph: null,
      sidebarVisible: false,
      graphShareId: null,
      shareDetails: null,
      edgeDetailsStore: useEdgeDetailsStore(),
    }
  }
}
</script>

<template>
  <Header class="header" size="s">
    <div class="graph-name" v-if="this.shareDetails">
      <b>{{ this.shareDetails.workspace_name }} / {{ this.shareDetails.experiment_name }} / {{ this.graph.created_at }}</b>
    </div>
    <div class="align-right" v-if="shareDetails">
      <span class="medium">Available until: {{ shareDetails.valid_until }}</span>
    </div>
  </Header>
  <EdgeDetails v-if="edgeDetailsStore.selectedEdge" :edge="edgeDetailsStore.selectedEdge" @close="edgeDetailsStore.clearSelectedEdge" />
  <main
    v-if="
      graphStore && graphStore.currentGraph !== null
    "
  >
    <Graph :graph="graphStore.currentGraph" :algorithm="graphStore.currentAlgorithm" />
  </main>
  <main v-else>
    <div
      class="empty"
      v-if="
       graphStore && graphStore.currentGraph === null
      "
    >
      <img src="../assets/img/computing%20mouse.png" alt="No model selected" />
      <span>No results available.</span>
    </div>
    <div class="loading" v-else>
      {{ graph }}
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
  font-family: 'Open-Sans-Regular', sans-serif;
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

a.label:focus,
a.label:hover {
  outline: none;
  background-color: #555;
}
.label:focus {
  outline: #fff 2px solid;
}

.align-right {
  margin-left: auto;
}
</style>
