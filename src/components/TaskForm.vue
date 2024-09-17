<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I nedd to..." v-model="newTask" />
    <button>Add</button>
  </form>
</template>

<script lang="ts">
import { useTaskStore } from "@/store/TaskStore";
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskForm",
  setup() {
    const taskStore = useTaskStore();
    const newTask = ref("");

    const handleSubmit = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          title: newTask.value,
          isFav: false,
          id: Math.floor(Math.random() * 10000),
        });
        newTask.value = "";
      }
    };
    return {
      newTask,
      handleSubmit,
    };
  },
});
</script>
