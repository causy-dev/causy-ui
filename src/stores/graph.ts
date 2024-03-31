import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {ApiService} from "@/api/ui/services/ApiService";
import type {CausyModel} from "@/api/ui";
export const useCurrentGraphStore = defineStore("currentGraph",{
   state: () => ({
        graph: null as CausyModel | null,
    }),
    getters: {
        graph: (state) => state.graph,
    },
    actions: {
        setGraph(graph: CausyModel) {
            this.graph = graph;
        },
        fetchGraph() {
          ApiService.getModelApiV1ModelGet().then(response => {
            this.graph = response;
          });
        }
    },
});
