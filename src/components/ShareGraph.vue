<script lang="ts">
import { useCurrentGraphStore } from '@/stores/graph'
import { OpenAPI, ShareCreatedResponse, V1Service } from '@/api/share'
import type { CreateShareRequest, CausyModel_Input } from '@/api/share'
import { toRaw } from 'vue'
import moment from 'moment'
import {useWorkspaceStore} from "@/stores/workspace";
import {usePipelineSidebarStore} from "@/stores/pipelineSidebar";
import { Button,  } from '@causy-dev/causy-components'
import '@causy-dev/causy-components'
interface availableSharingDuration {
  name: string
  value: number | null
}
interface ShareGraphData {
  availableSharingDurations: availableSharingDuration[]
  selectedSharingDuration: number | null
  shareResult: ShareCreatedResponse | null
}

interface DataProps {
  workspaceStore: WorkspaceStoreType
}

export default {
  name: 'ShareGraph',
  components: {Button},
  props: {},
  emits: ['toggleShare', 'share'],
  data(): DataProps {
    return {
      workspaceStore: useWorkspaceStore(),
    }
  },
  methods: {
    updateSelectedSharingDuration(duration: availableSharingDuration) {
      this.selectedSharingDuration = duration.value
      this.$forceUpdate()
    },
    isActive(duration: availableSharingDuration) {
      return this.selectedSharingDuration === duration.value
    },
    share() {
      console.log('share me baby')
      const wsStore = useWorkspaceStore();
      console.log(wsStore.currentResult)
      const graphData: CausyModel_Input = wsStore.currentResult as CausyModel_Input;
      const duration = this.selectedSharingDuration
      console.log(duration)

      // Calculate valid until date
      let validUntil: string = null
      if (duration !== null) {
        let date = moment()
        date.add(duration, 'days')
        validUntil = date.toISOString()
      }

      console.log(wsStore.currentExperimentVersion)

      const requestBody: CreateShareRequest = {
        data: graphData,
        algorithm: wsStore.currentAlgorithm,
        valid_until: validUntil,
        workspace_name: wsStore.currentWorkspace.name,
        experiment_name: wsStore.currentExperimentName,
        experiment_date: wsStore.currentExperimentVersion,
      }
      console.log(requestBody)
      try {
        V1Service.createShareV1SharePost(requestBody)
          .then((response) => {
            console.log('ok')
            console.log(response)
            this.shareResult = response
          })
          .catch((error) => {
            console.log('error')
            console.log(error)
          })
      } catch (error) {
        console.log('error')
        console.log(error)
      }
    }
  },
  computed: {
    OpenAPI() {
      return OpenAPI
    }
  },
  data(): ShareGraphData {
    return {
      availableSharingDurations: [
        {
          name: '1 day',
          value: 1
        },
        {
          name: '1 week',
          value: 7
        },
        {
          name: '1 month',
          value: 30
        },
        {
          name: '1 year',
          value: 365
        },
        {
          name: 'Forever',
          value: null
        }
      ],
      selectedSharingDuration: null,
      shareResult: null
    }
  }
}
</script>

<template>
  <div class="share">
    <div class="share-content" v-if="shareResult">
      <h4>Your model has been published</h4>
      <p>You can now share this link with others:</p>
      <input
        class="copy-input"
        type="text"
        :value="OpenAPI.BASE + '/share/' + shareResult.share_id"
        readonly
      />
      <div class="button-group">
        <Button appearance="primary"
                  emphasis="high"
                  @click="$emit('toggleShare')"
        >Close</Button>
      </div>
    </div>
    <div class="share-content" v-else>
      <h4>Share this model</h4>
      <form @submit.prevent="share">
        <label for="share-duration">Share for</label>
        <div id="share-duration" class="toggle-group" :key="selectedSharingDuration">
          <button
            type="button"
            class="label small"
            :key="duration"
            v-for="duration in availableSharingDurations"
            @click="updateSelectedSharingDuration(duration)"
            :aria-label="'Share for ' + duration.name"
            :class="{ active: isActive(duration) }"
          >
            {{ duration.name }}
          </button>
        </div>
        <span class="legal"
          >By sharing this model, you agree to our
          <a :href="OpenAPI.BASE + '/documents/tos'">Terms of Service</a>.</span
        >

        <div class="button-group">
          <Button appearance="primary"
                  emphasis="high">Share</Button>
          <Button
              appearance="primary"
              emphasis="medium"
            @click="$emit('toggleShare')"
          >
            Cancel
          </Button>
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
  font-family: 'Open-Sans-Bold', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.share-content form {
  display: flex;
  flex-direction: column;
}

.share-content label {
  font-family: 'Open-Sans-Regular', sans-serif;
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
  color: #5620bf;
  display: inline;
}

.toggle-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}

.toggle-group button {
  margin-right: 0rem;
  border: 1px solid #5620bf;
  background-color: #fff;
  color: #5620bf;
  padding: 0.2rem 0.4rem;
  border-radius: 0px;
  font-size: 0.8rem;
  font-weight: normal;
  cursor: pointer;
  user-select: none;
  border-right: none;
}

.toggle-group button.active {
  background-color: #5620bf;
  color: #fff;
}

.toggle-group button.active:hover {
  background-color: #5620bf;
  color: #fff;
}

.toggle-group button:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.toggle-group button:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-right: 1px solid #5620bf;
}
.legal {
  font-family: 'Open-Sans-Regular', sans-serif;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: -0.5rem;
}

.button-group button {
  margin-right: 0.5rem;
}

.copy-input {
  width: 300px;
}
</style>
