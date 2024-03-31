<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "LoadingSpinner",
  props: {
    text: {
      type: String,
      required: true
    }
  }
})
</script>

<template>
  <div class="loading-wrapper">
    <div class="loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">{{ text }}</div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}

.loading-spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid rgba(2, 140, 140, 0.94);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.loading-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.loading-text {
  font-family: "Open-Sans-Regular", sans-serif;
  font-size: 1.5rem;
  margin-top: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
