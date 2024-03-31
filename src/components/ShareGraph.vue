<script  lang="ts">
import {useCurrentGraphStore} from "@/stores/graph";
import {V1Service} from "@/api/share";

interface availableSharingDuration {
  name: string;
  value: number | null;
}
interface ShareGraphData {
  availableSharingDurations: availableSharingDuration[];
  selectedSharingDuration: number | null;
}

export default {
  name: "ShareGraph",
  props: {
  },
  emits: ['toggleShare', 'share'],
  methods: {
    updateSelectedSharingDuration(duration: availableSharingDuration) {
      this.selectedSharingDuration = duration.value;
      this.$forceUpdate();
    },
    isActive(duration: availableSharingDuration) {
      return this.selectedSharingDuration === duration.value;
    },

    share() {
      var graph = useCurrentGraphStore();
      V1Service.createShareV1SharePost({
        graph: graph.graph,
        duration: this.selectedSharingDuration,
      }).then((response) => {
        console.log(response);
        this.$emit('toggleShare');
      });
    }

  },
  computed: {

  },
  data(): ShareGraphData {
    return {
      availableSharingDurations: [
        {
          name: "1 day",
          value: 1,
        },
        {
          name: "1 week",
          value: 7,
        },
        {
          name: "1 month",
          value: 30,
        },
        {
          name: "1 year",
          value: 365,
        },
        {
          name: "Forever",
          value: null,
        },
      ],
      selectedSharingDuration: null,
    }
  },

};
</script>

<template>
  <div class="share">
    <div class="share-content">
      <h4>Share this model</h4>
      <form>
        <label for="share-duration">Share for</label>
        <div id="share-duration" class="toggle-group" :key="selectedSharingDuration">
        <button type="button" class="label small" :key="duration" v-for="duration in availableSharingDurations" @click="updateSelectedSharingDuration(duration)" :aria-label="'Share for ' + duration.name" :class="{ active: isActive(duration) }">{{duration.name}}</button>        </div>
        <span class="legal">By sharing this model, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</span>

        <div class="button-group">
          <button class="button medium" @click="share">Share</button>
          <button class="button button-secondary medium" @click="$emit('toggleShare')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

.share {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-content {
  background-color: #fff;
  color: #181818;
  padding: 2rem;
  border-radius: 4px;
  width: 30rem;
}

.share-content h4 {
  font-family: "Open-Sans-Bold", sans-serif;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.share-content form {
  display: flex;
  flex-direction: column;
}

.share-content label {
  font-family: "Open-Sans-Regular", sans-serif;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.share-content select {
  margin-bottom: 1rem;
}

.share-content button {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.share-content a {
  color: #008B8BFF;
  display: inline;
}

.toggle-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}

.toggle-group button {
  margin-right: 0rem;
  border: 1px solid #008B8BFF;
  background-color: #fff;
  color: #008B8BFF;
  padding: 0.2rem 0.4rem;
  border-radius: 0px;
  font-size: 0.8rem;
  font-weight: normal;
  cursor: pointer;
  user-select: none;
  border-right: none;

}

.toggle-group button.active {
  background-color: #008B8BFF;
  color: #fff;
}

.toggle-group button.active:hover {
  background-color: #008B8BFF;
  color: #fff;
}

.toggle-group button:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.toggle-group button:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-right: 1px solid #008B8BFF;
}
.legal {
  font-family: "Open-Sans-Regular", sans-serif;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}


.button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.button {
  margin-left: 0.5rem;
  border: 1px solid #008B8BFF;
  background-color: #fff;
  color: #008B8BFF;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: normal;
  cursor: pointer;
  user-select: none;
}

.button:hover {
  background-color: #008B8BFF;
  color: #fff;
}

.button.button-secondary {
  border: 1px solid #008B8BFF;
  background-color: #fff;
  color: #008B8BFF;
}

.button-group button:first-child {
  margin-left: 0;
}


</style>
