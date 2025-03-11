import { create } from "zustand";

const useDataStore = create((set) => ({
  // Állapot
  cls: [],
  studentsByClass: [],
  isLoading: false,
  error: null,
  selectedStudent: null,
  selectedClass: null,

  setSelectedStudent: (student) => set({ selectedStudent: student }),
  setSelectedClass: (_class) => set({ selectedClass: _class }),

  // Aszinkron művelet a data fetchelésre
  fetchClasses: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("https://localhost:7144/api/Teacher");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('Fetched data:', data);

      set({ cls: data, isLoading: false, error: null });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchClass: async (name) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `https://localhost:7144/api/Teacher/GetClassByName?name=${name}`
      );

      if (!response.ok) throw new Error(`Hiba: ${response.status}`);
      const data = await response.json();
      set({ studentsByClass: data, isLoading: false, error: null });
    } catch (error) {
      console.error("Valami hiba történt:", error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useDataStore;
