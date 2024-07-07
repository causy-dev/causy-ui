import { defineStore } from 'pinia'

export type SimpleEdge = {
    u: str
    v: str
}

export const useEdgeDetailsStore = defineStore('edgeDetails', {
  state: () => ({
    edge: null as SimpleEdge | null
  }),
  getters: {
    selectedEdge: (state) => state.edge
  },
  actions: {
    setSelectedEdge(u: str, v: str) {
      // If the edge is already selected, deselect it
        if (this.edge && this.edge.u === u && this.edge.v === v) {
            this.edge = null
        } else {
            this.edge = {u, v}
        }
    },
    clearSelectedEdge() {
      this.edge = null
    }
  }
})
