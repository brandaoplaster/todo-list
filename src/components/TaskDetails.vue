<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="taskStore.toggleFav(task.id)" class="material-icons">favorite</i>
      <i @click="taskStore.deleteTask(task.id)" class="material-icons">delete</i>
    </div>
  </div>
</template>

<script lang="ts">
import { useTaskStore } from "@/store/TaskStore";
import { defineComponent } from "vue";

  export default defineComponent({
    name: 'TaskDetails',
    props: ["task"],
    setup() {
      const taskStore = useTaskStore()

      return { taskStore }
    }
  });
</script>
