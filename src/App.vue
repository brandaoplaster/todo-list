<template>
  <main>
    <header>
      <img src="./assets/logo.png" alt=" pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <task-form />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favs tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.isLoading">
      Loading tasks....
    </div>

    <div class="task-list" v-if="filter === 'all'">
      <p>Your have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" v-bind:key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <p>Your have {{ taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs" v-bind:key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">
      Reset state
    </button>

  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from './components/TaskForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskDetails,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore()

    const filter = ref("all")

    return { taskStore, filter }
  }
});
</script>

<style>

</style>
