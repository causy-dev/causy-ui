import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CausyModel } from '@/api/models/CausyModel'
import {ApiService} from "@/api";
export const useCurrentGraphStore = defineStore("currentGraph",{
   state: () => ({
        graph: CausyModel,
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
