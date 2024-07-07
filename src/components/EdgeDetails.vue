<script lang="ts">
import type { SimpleEdge } from '@/stores/edgeDetails';
import {PropType} from "vue";
import IconClose from "@/components/icons/IconClose.vue";
import {useCurrentGraphStore} from "@/stores/graph";

type CurrentGraphStoreType = ReturnType<typeof useCurrentGraphStore>

interface DataProps {
  currentGraphStore: CurrentGraphStoreType
}
export default {
  name: 'EdgeDetails',
  components: {IconClose},
   props: {
      edge: {
        type: Object as PropType<SimpleEdge>,
        required: true
      }
    },
  data(): DataProps {
  return {
      currentGraphStore: useCurrentGraphStore()
    }
  },
  computed: {
    currentEdge() {
      return this.currentGraphStore.graph.edges.find((edge) => edge.u.id === this.$props.edge.u && edge.v.id === this.$props.edge.v)
    }
  }
}

</script>

<template>
  <div class="edge-details-panel">
    <div class="header-actions">
      <IconClose class="action" @click="$emit('close')"
        />
    </div>
    <h4>{{ currentEdge.u.name }} {{ currentEdge.edge_type.STR_REPRESENTATION }} {{ currentEdge.v.name }}</h4>
    <b>Edge Type:</b> {{ currentEdge.edge_type.name }}<br />
    <b>Metadata:</b>
      <VCodeBlock
        v-if="currentEdge.metadata"
        :code="JSON.stringify(currentEdge.metadata, )"
        highlightjs
        lang="json"
        theme="vs"
        class="editor"
      />

  </div>
</template>

<style scoped>
.edge-details-panel {
  background-color: rgba(255, 255, 255, 0.90);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 100;
  min-width: 150px;
  max-width: 250px;
  border-radius: 4px;
  text-align: left; color: #000;
  padding: 15px 10px;
  position: fixed;
  top: 4rem;
  right: 1rem;
  font-size: 0.8rem;

}

.edge-details-panel h4 {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-right: 1rem;
}

.edge-details-panel b {
  font-weight: 600;
}

.edge-details-panel .header-actions {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  right: 1rem;
  margin-bottom:  -1rem;
}

.edge-details-panel .action {
  cursor: pointer;
  width: 1rem;
  height: 1rem;
}

.editor {
  border-radius: 0rem !important;
}

</style>
