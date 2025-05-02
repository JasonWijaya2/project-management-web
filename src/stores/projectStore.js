import { create } from "zustand";
import api from "../utils/api";

const useProjectStore = create((set) => ({
  projects: [],
  projectDetail: null,
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/projects");
      set({ projects: response.data.data || [] });
    } catch (error) {
      console.error("Failed to fetch projects", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchProjectDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/api/projects/${id}`);
      set({ projectDetail: response.data.data || null });
    } catch (error) {
      console.error("Failed to fetch project detail", error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProjectStore;
