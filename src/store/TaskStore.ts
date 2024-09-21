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
    tasks: [],
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
    async addTask(task: Task) {
      this.tasks.push(task)

      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {"Content-Type":  "application/json"}
      })
    },
    async deleteTask(id: number) {
      this.tasks = this.tasks.filter((t: Task) => {
        return t.id != id
      })

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "DELETE"
      })
    },
    async toggleFav(id: number) {
      const task = this.tasks.find((t: Task) => t.id === id)
      if (task) {
        task.isFav = !task.isFav
      }

      const res = await fetch("http://localhost:3000/tasks/" + id, {
        method: "PATCH",
        body: JSON.stringify({isFav: task?.isFav}),
        headers: {"Content-Type":  "application/json"}
      })
    }
  }
});
