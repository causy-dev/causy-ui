<script lang="ts">
import Graph from '@/components/Graph.vue'
import PipelineStepsSidebar from '@/components/sidebars/PipelineStepsSidebar.vue'
import ShareGraph from '@/components/ShareGraph.vue'
import { useCurrentGraphStore } from '@/stores/graph'
import { Header, Spinner } from '@causy-dev/causy-components'
import SideNavigation from '@/components/SideNavigation.vue'
import SidebarContainer from '@/components/SidebarContainer.vue'
import { useUIStore } from '@/stores/ui'
import { useWorkspaceStore } from '@/stores/workspace'
import { Workspace } from '@/api/ui'
import ExperimentSelect from '@/components/ExperimentSelect.vue'
import SidebarItem from '@/components/SidebarItem.vue'
import EdgeDetails from "@/components/EdgeDetails.vue";
import {useEdgeDetailsStore} from "@/stores/edgeDetails";

interface DataProps {
  shareVisible: boolean
  activeSidebarItem: string | null
  graph: any
  algorithm: Algorithm | null
  workspace: Workspace | null
  workspaceStore: any
  graphStore: any,
  edgeDetailsStore: any
  uiStore: any
  sidePanels: any[]
}
export default {
  name: 'HomeView',
  components: {
    EdgeDetails,
    SidebarItem,
    ExperimentSelect,
    SidebarContainer,
    SideNavigation,
    ShareGraph,
    Spinner,
    PipelineStepsSidebar,
    Graph,
    Header
  },

  mounted() {
    this.uiStore.fetchStatus().then(() => {
      console.log(this.uiStore.currentStatus)
      if (this.uiStore.currentStatus.workspace_loaded) {
        console.log(this.workspaceStore)
        this.workspaceStore.fetchExperiments()
        this.workspaceStore.fetchWorkspace().then(() => {
          this.workspace = this.workspaceStore.currentWorkspace
        })
      }
    })
  },
  methods: {
    toggleShare() {
      this.shareVisible = !this.shareVisible
    },
    handleActiveSidebarItemUpdate(update) {
      let activeItem = update.active
      if (this.activeSidebarItem == activeItem || activeItem == null) {
        this.activeSidebarItem = null
        this.sidePanels = []
      } else {
        this.sidePanels = []
        this.activeSidebarItem = activeItem
        this.sidePanels.push(update.panel)
      }
    },
    addSidepanel(details) {
      for (let panel of this.sidePanels) {
        if (panel.name === details.name) {
          return
        }
      }
      this.sidePanels.push(details)
    },
    handleClose(index) {
      if (index > -1) {
        console.log('close', index)
        this.sidePanels.splice(index)
        console.log(this.sidePanels)
      }

      if (this.sidePanels.length === 0) {
        this.activeSidebarItem = null
      }
    }
  },
  data(): DataProps {
    return {
      graph: null,
      algorithm: null,
      shareVisible: false,
      activeSidebarItem: null,
      workspace: null,
      workspaceStore: useWorkspaceStore(),
      uiStore: useUIStore(),
      edgeDetailsStore: useEdgeDetailsStore(),
      graphStore: useCurrentGraphStore(),
      sidePanels: []
    }
  }
}
</script>

<template>
  <Header class="header" size="s">
    <div class="workspace-name" v-if="workspace">
      {{ workspace.name }}
    </div>
    <div v-if="workspaceStore.currentExperimentVersion" class="experiment-select-center">
      <ExperimentSelect />
    </div>
    <div class="align-right">
      <a class="label medium" @click="toggleShare()">Share</a>
    </div>
  </Header>
  <SideNavigation
    @update:active="handleActiveSidebarItemUpdate"
    :navigationActive="sidePanels.length > 0"
  />
  <SidebarContainer
    v-if="sidePanels !== null && sidePanels.length > 0"
    :side-panels="sidePanels"
    @close="handleClose"
    @addSidepanel="addSidepanel"
  />
  <ShareGraph
    v-if="this.workspaceStore.currentResult && shareVisible"
    @toggleShare="toggleShare()"
  />
  <EdgeDetails v-if="edgeDetailsStore.selectedEdge" :edge="edgeDetailsStore.selectedEdge" @close="edgeDetailsStore.clearSelectedEdge" />
  <main
    v-if="
      this.workspaceStore.currentResult !== null && this.workspaceStore.currentAlgorithm !== null
    "
  >
    <Graph :graph="this.workspaceStore.currentResult" :algorithm="this.workspaceStore.algorithm" />
  </main>
  <main v-else>
    <div
      class="empty"
      v-if="
        this.uiStore.currentStatus &&
        this.uiStore.currentStatus.workspace_loaded &&
        !this.workspaceStore.currentResult
      "
    >
      <img src="../assets/img/computing%20mouse.png" alt="No model selected" />
      <span>No results available.</span>
    </div>
    <div class="loading" v-else>
      <Spinner>Loading model...</Spinner>
    </div>
  </main>
</template>

<style scoped>
.loading,
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}

.empty > img {
  width: 15rem;
  height: 15rem;
}

.empty > span {
  font-family: 'Open-Sans-Regular', sans-serif;
  font-size: 1.5rem;
  margin-top: 1rem;
}

.header {
  padding: 0 1rem;
  height: 3rem;
}

.workspace-name {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
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

.experiment-select-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
