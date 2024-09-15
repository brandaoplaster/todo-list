<template>
  <main>
    <header>
      <img src="./assets/logo.png" alt=" pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="task-list">
      <div v-for="task in taskStore.tasks" v-bind:key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";

export default defineComponent({
  name: 'App',
  components: {
    TaskDetails
  },
  setup() {
    const taskStore = useTaskStore()

    return { taskStore }
  }
});
</script>

<style>

</style>
