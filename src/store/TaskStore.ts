import { defineStore } from "pinia";

interface Task {
  id: number;
  title: string;
  isFav: boolean;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean
}

export const useTaskStore = defineStore('taskStore', {
  state: (): TaskState => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "play Fifa", isFav: true },
      { id: 3, title: "working in project", isFav: false },
    ],
    isLoading: false
  }),
  getters: {
    favs: (state): Task[] => state.tasks.filter(task => task.isFav),
    favCount: (state): number => state.tasks.reduce((p, c) => {
      return c.isFav ? p + 1 : p
    }, 0),
    totalCount: (state): number => state.tasks.length
  },
  actions: {
    async getTask() {
      this.isLoading = true
      const res = await fetch("http://localhost:3000/tasks")
      const data = await res.json()
      this.tasks = data
      this.isLoading = false
    },
    addTask(task: Task) {
      this.tasks.push(task)
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t: Task) => {
        return t.id != id
      })
    },
    toggleFav(id: number) {
      const task = this.tasks.find((t: Task) => t.id === id)
      if (task) {
        task.isFav = !task.isFav
      }
    }
  }
});
