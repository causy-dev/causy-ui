<script lang="ts">
import {useCurrentGraphStore} from "@/stores/graph";
import {Tag} from "@causy-dev/causy-components";
import "@causy-dev/causy-components";
import IconSandclock from "@/components/icons/IconSandclock.vue";
import {useWorkspaceStore} from "@/stores/workspace";
import {ExtendedResult, Algorithm} from "@/api/ui";
export default {
  name: "PipelineStepsSidebar",
  components: {
    IconSandclock,
    Tag,
  },
  mounted() {
    this.workspaceStore = useWorkspaceStore();
  },

  data() {
    return {
      workspaceStore: null,
    };
  },

  computed: {
    mergedPipelineSteps() {
      let mergedSteps = [];
      let availableSteps = [];
      for (let step of this.workspaceStore.algorithm.pipeline_steps) {
        availableSteps.push(step);
      }
      console.log(availableSteps);
      for(let step of this.workspaceStore.result.action_history) {
        let algoStepDefinition = null;
        for(let algoStep in availableSteps) {
          if(availableSteps[algoStep].name === step.name) {
            console.log(availableSteps[algoStep].name)
            console.log(availableSteps[algoStep]);
            algoStepDefinition = availableSteps[algoStep];
            console.log(algoStepDefinition);
            availableSteps.splice(algoStep, 1);
            break;
          }
        }

        console.log(algoStepDefinition);
        if(algoStepDefinition === null) {
          algoStepDefinition = {
            display_name: step.name,
            description: "No description available",
          };
        }
        mergedSteps.push({
          actions: step.actions,
          definition: algoStepDefinition,
          duration: step.duration,
        });
      }
      console.log(mergedSteps);
      return mergedSteps;

    },
  },

};

</script>

<template>
<ul class="algorithm-steps" v-if="this.workspaceStore && this.workspaceStore.result && this.workspaceStore.algorithm">
  <li v-for="step in mergedPipelineSteps">
    {{step.definition.display_name }}
    <div class="tags">
      <Tag size="s" appearance="neutralLight">
        {{step.actions.length}}
      </Tag>
      <Tag size="s" appearance="neutralDark">
        <template #start>
          <IconSandclock class="tag-icon" />
        </template>
        {{Math.round(step.duration)}}
      </Tag>
    </div>
  </li>
</ul>
</template>

<style scoped>
.algorithm-steps {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.algorithm-steps li {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag-icon {
  width: 0.8rem;
  height: 0.8rem;
}

</style>
