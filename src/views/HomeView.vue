<script lang="ts">
import Graph from "@/components/Graph.vue";
import PipelineStepsSidebar from "@/components/PipelineStepsSidebar.vue";
import ShareGraph from "@/components/ShareGraph.vue";
import {useCurrentGraphStore} from "@/stores/graph";
import {Header, Spinner} from "@causy-dev/causy-components";
import SideNavigation from "@/components/SideNavigation.vue";
import SidebarContainer from "@/components/SidebarContainer.vue";
import {useUIStore} from "@/stores/ui";
import {useWorkspaceStore} from "@/stores/workspace";
import {Workspace} from "@/api/ui";
import ExperimentSelect from "@/components/ExperimentSelect.vue";

interface DataProps {
  sidebarVisible: boolean;
  shareVisible: boolean;
  activeSidebarItem: string | null;
  graph: any;
  algorithm: Algorithm | null;
  workspace: Workspace | null;
  workspaceStore: any;
  uiStore: any;
}
export default {
  name: "HomeView",
  components: {
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
      console.log(this.uiStore.currentStatus);
      if (this.uiStore.currentStatus.workspace_loaded) {
        console.log(this.workspaceStore);
        this.workspaceStore.fetchExperiments();
        this.workspaceStore.fetchWorkspace().then(() => {
          this.workspace = this.workspaceStore.currentWorkspace;
        });
      }
    });

  },
  methods: {
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
    toggleShare() {
      this.shareVisible = !this.shareVisible;
    },
    handleActiveSidebarItemUpdate(activeItem) {
      this.activeSidebarItem = activeItem;
    },

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
    };
  },
}
</script>

<template>
  <Header class="header" size="s">
    <div class="workspace-name" v-if="workspace">
      {{workspace.name}}
    </div>
    <div v-if="workspaceStore.currentExperiment" class="experiment-select-center">
      <ExperimentSelect />
    </div>
    <div class="align-right">
      <a class="label medium" @click="toggleShare()">Share</a>
    </div>
  </Header>
  <SideNavigation @update:active="handleActiveSidebarItemUpdate" />
  <SidebarContainer v-if="workspaceStore.currentResult && activeSidebarItem == 'steps'" title="Pipeline Steps">
    <PipelineStepsSidebar />
  </SidebarContainer>

  <SidebarContainer v-if="graph && activeSidebarItem == 'graph'" title="Edit Preknowledge Graph">
    hello
  </SidebarContainer>
  <ShareGraph v-if="this.workspaceStore.currentResult && shareVisible" @toggleShare="toggleShare()" />
  <main v-if="this.workspaceStore.currentResult !== null && this.workspaceStore.currentAlgorithm !== null">
    <Graph :graph="this.workspaceStore.currentResult" :algorithm="this.workspaceStore.algorithm" />
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
  padding: 0 1rem;
  height: 3rem;
}

.workspace-name {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
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

.experiment-select-center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

</style>
