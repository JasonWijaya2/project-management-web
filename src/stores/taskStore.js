import { create } from "zustand";
import api from "../utils/api";

const useTaskStore = create((set) => ({
  tasks: [],
  loadingTasks: false,
  taskError: null,

  fetchTasksByProject: async (projectId) => {
    set({ loadingTasks: true, taskError: null });
    try {
      const response = await api.get(`/api/projects/${projectId}/tasks`);
      set({ tasks: response.data.data || [] });
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      set({ taskError: error.message });
    } finally {
      set({ loadingTasks: false });
    }
  },
}));

export default useTaskStore;
