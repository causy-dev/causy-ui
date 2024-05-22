<script lang="ts">
import IconSteps from "@/components/icons/IconSteps.vue";
import IconGraphEdit from "@/components/icons/IconGraphEdit.vue";
import IconAlgorithmSettings from "@/components/icons/IconAlgorithmSettings.vue";

export default {
  name: "SideNavigation",
  components: {IconAlgorithmSettings, IconGraphEdit, IconSteps},
  props: {
    initial: {
      type: String,
      default: null,
    },
    menuItems: {
      type: Array,
      default: () => [
        {name: "steps", icon: "IconSteps", alt: "Steps"},
        {name: "graph", icon: "IconGraphEdit", alt: "Edit Preknowledge Graph"},
        {name: "settings", icon: "IconAlgorithmSettings", alt: "Algorithm Settings"},
      ],
    },
  },
  data() {
    return {
      active: this.initial,
    };
  },
  methods: {
    updateActive(item) {
      console.log(item);
      console.log(this.active);
      if (this.active === item) {
        // If the clicked item is already active, deactivate it
        this.active = null;
      } else {
        // Otherwise, activate the clicked item
        this.active = item;
      }
      this.$emit("update:active", this.active);
    },
  },
  emits: ["update:active"],

};
</script>

<template>
  <aside class="sidebar">
    <ul class="sidebar-icons" v-if="menuItems">
      <li v-for="item in menuItems" @keyup.enter="updateActive(item.name)" :key="item.name" :class="{active: item.name === active}" @click="this.updateActive(item.name)" aria-label="item.alt" aria-current="page" tabindex="0">
        <component :is="item.icon" class="icon" alt="item.alt" />
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4rem;
  background-color: #2B1060;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.sidebar-icons {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding-top: 4rem;
}

.sidebar-icons li {
  padding: 0.5rem;
  line-height: 0;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.sidebar-icons li .icon{
  fill: #9787b1;
  font-size: 2rem;
  height: 2rem;
  width: 2rem;
}

.sidebar-icons li.active, .sidebar-icons li:hover {
  background-color: #3C1E8A;
}

.sidebar-icons li.active .icon{
  fill: #fff;
}

.sidebar-icons i {
  font-size: 2rem;
  height: 2rem;
  width: 2rem;
}
</style>
