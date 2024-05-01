<script lang="ts">
import {MarkerType} from '@vue-flow/core';
import type {ConnectionHandle} from  '@vue-flow/core';

import {Layout} from "webcola";
import type {EdgeInterface, CausyExtendedResult} from "@/api/ui";
import { Graph as CausyGraph} from "@causy-dev/causy-components";
import('@vue-flow/core/dist/style.css');
import('../assets/vueflow.css');
type NodePosition = {
  x: number;
  y: number;
};

export default {
  components: {
    CausyGraph
  },
  name: 'Graph',
  props: {
    graph: Object as () => CausyExtendedResult,
  },

  data() {
    return {
      elements: [
      ]
    }
  },
  methods: {
    findBestHandle(from: ConnectionHandle, to: ConnectionHandle) {
      // find the relative position of the two nodes
      let relative_position = {
        x: to.x - from.x,
        y: to.y - from.y,
      };
      if(relative_position.x === 0 && relative_position.y === 0) {
        return ["top", "bottom"];
      }
      if (Math.abs(relative_position.x) > Math.abs(relative_position.y)) {
        if (relative_position.x > 0) {
          return ["right", "left"];
        } else {
          return ["left", "right"];
        }
      } else {
        if (relative_position.y > 0) {
          return ["bottom", "top"];
        } else {
          return ["top", "bottom"];
        }
      }
    },

    deduplicateUndirectedEdges(edges: EdgeInterface[]) {
      let deduplicated_edges = [];
      let edge_ids = new Set();
      for(let edge of edges) {
        let edge_id_ft = edge.u.id + edge.v.id;
        let edge_id_tf = edge.v.id + edge.u.id;
        if(edge_ids.has(edge_id_ft) || edge_ids.has(edge_id_tf)) {
          continue;
        }
        edge_ids.add(edge_id_ft);
        deduplicated_edges.push(edge);
      }
      return deduplicated_edges;

    },

    calculateLayout(edges: EdgeInterface[], nodes: any) : Record<string, NodePosition> {
      let node_id_to_number: Record<string, number>  = {};
      let node_number_to_id: Record<number, string> = {};
      let node_number: number = 0;

      type Link = {
        source: number;
        target: number;
      };
      let links: Link[] = [];

      for(let edge of edges) {
        if(!(edge.u.id in node_id_to_number)) {
          node_id_to_number[edge.u.id] = node_number;
          node_number_to_id[node_number] = edge.u.id;
          node_number += 1;
        }
        if(!(edge.v.id in node_id_to_number)) {
          node_id_to_number[edge.v.id] = node_number;
          node_number_to_id[node_number] = edge.v.id;
          node_number += 1;
        }

        links.push({source: node_id_to_number[edge.u.id], target: node_id_to_number[edge.v.id]})

      }

      for(let node_id in nodes) {

        if(!(node_id in node_id_to_number)) {
          node_id_to_number[node_id] = node_number;
          node_number_to_id[node_number] = node_id;
          node_number += 1;
        }
        links.push({source: node_id_to_number[node_id], target: node_id_to_number[node_id]})
      }

      let layout = new Layout().links(links).avoidOverlaps(true);
      layout.nodes().forEach(v => {
        v.width = 300;
        v.height = 300;
      });
      layout.start(1000);
      let node_positions: Record<string, NodePosition> = {};

      for(let node_number in layout._nodes) {
        let node_id: number = node_number_to_id[node_number];
        node_positions[node_id] = {
          x: layout._nodes[node_number].x,
          y: layout._nodes[node_number].y,
        };
      }

      return node_positions;
    }

  },

  computed: {
    elements(): Element[] {
      let elements: Element[] = [];

      if(this.graph === null || this.graph === undefined || this.graph.nodes === undefined || this.graph.edges === undefined) {
        return elements;
      }

      let layout = this.calculateLayout(this.graph.edges, this.graph.nodes);
      for (const node_id in this.graph.nodes) {
        const node = this.graph.nodes[node_id];
        console.log(layout[node_id]);
        elements.push({
          type: "custom",
          id: node.id,
          label: node.name,
          position:  layout[node_id],
        });
      }

      for(const edge of this.deduplicateUndirectedEdges(this.graph.edges)) {
        let stroke = '#333';
        let isAnimated = false;

        if(edge.metadata === undefined) {
          continue;
        }

        let handlePositions = this.findBestHandle(
        {
          id: "",
          nodeId: "",
          type: undefined,
          x: layout[edge.u.id].x, y: layout[edge.u.id].y, width: 200, height: 100},
        {
          id: "",
          nodeId: "",
          type: undefined,x: layout[edge.v.id].x, y: layout[edge.v.id].y, width: 200, height: 100
        });
        let targetHandleStyle = MarkerType.null;
        let sourceHandleStyle = MarkerType.null;
        let edge_label = null
        let edge_value = null;

        if(edge.edge_type == "DIRECTED") {
          targetHandleStyle = MarkerType.ArrowClosed;

          if("direct_effect" in edge.metadata) {
            edge_value = edge.metadata.direct_effect;
            edge_label = "Effect: "+edge.metadata.direct_effect.toFixed(4).toString()+" ("+edge.metadata.correlation.toFixed(4).toString()+")";
          } else if("correlation" in edge.metadata) {
            edge_label = "Correlation: "+edge.metadata.correlation.toFixed(4).toString();
            edge_value = edge.metadata.correlation;
          }

          console.log(edge.metadata.correlation);
          if(edge_value !== null && edge_value < 0) {
            stroke = '#f00000';
          } else {
            stroke = '#0f0fff';
          }
          isAnimated = true;

        } else if (edge.edge_type == "BIDIRECTED") {
          targetHandleStyle = MarkerType.ArrowClosed;
          sourceHandleStyle = MarkerType.ArrowClosed;
          if("correlation" in edge.metadata) {
            edge_label = "Correlation: "+edge.metadata.correlation.toFixed(4).toString();
          }
        }

        elements.push({
          id: edge.u.id + edge.v.id,
          source: edge.u.id,
          target: edge.v.id,
          label: edge_label,
          markerEnd: targetHandleStyle,
          markerStart: sourceHandleStyle,
          targetHandle: handlePositions[1],
          sourceHandle: handlePositions[0],
          animated: isAnimated,
          style: {
            stroke: stroke,
            backgroundColor: stroke,
            strokeWidth: 4,
          },
          type: 'smoothstep'
        });
      }

      return elements;
    },
  },
}
</script>

<template>
  <main>
    <div style="height: 100%;">
      <CausyGraph :elements="elements" />
    </div>
  </main>
</template>

<style scoped>
  main {
    height: 100vh;
    width: 100vw;
  }
</style>
