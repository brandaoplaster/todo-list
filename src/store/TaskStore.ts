import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {id: 1, title: "buy some milk", isFav: false},
      {id: 2, title: "play Fifa", isFav: true},
      {id: 3, title: "working in project", isFav: false},
    ]
  })
})
