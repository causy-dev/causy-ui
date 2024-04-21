<script lang="ts">
import {Handle, Position} from "@vue-flow/core";
export default {
  name: "Node",
  components: {Handle},
  props: {
    label: {
      type: String,
      required: true
    },
  },
  computed: {
    Position() {
      return Position
    }
  }
}
</script>

<template>
  <Handle id="top" :position="Position.Top"/>
  <Handle id="left" :position="Position.Left" />
  <div class="node">
    {{ label }}
  </div>
  <Handle id="right" :position="Position.Right"/>
  <Handle id="bottom" :position="Position.Bottom" />
</template>

<style scoped>
.node {
  background-color: #fff;
  min-width: 150px;
  max-width: 250px;
  border-radius: 4px;
  text-align: center; color: #000;
  padding: 15px 10px;
}
</style>
