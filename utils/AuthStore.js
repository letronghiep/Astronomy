import { create } from "zustand";
const useAuthStore = create((set) => ({
  token: null,
  roles: [],
  userData: (newToken, newRole) => {
    set({ token: newToken, roles: newRole });
  },
  hasRole: (role) => {
    return useAuthStore.getState().roles.includes(role);
  },
  logout: () => {
    set({ token: null, roles: [] });
  },
}));

export { useAuthStore };
