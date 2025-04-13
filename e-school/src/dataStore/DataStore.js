import { create } from "zustand";
import api from "..//api/axios";
import { Logout } from "@mui/icons-material";

const token = localStorage.getItem("accessToken");
const useDatastore = create((set, get) => ({
  token,
  isAuthenticated: !!token,
  setIsAuthenticated: (token) => {
    set({ isAuthenticated: true, token: token });
  },
  classes: [],
  students: [],
  selectedClass: "",
  selectedStudentId: "",
  setSelectedStudentId: (id) => {
    set({ selectedStudentId: id });
    console.log(get().selectedStudentId);
  },
  subjects: [],

  login: async (email, password) => {
    try {
      const response = await api.post("user/login", { email, password });
      if (response) {
        localStorage.setItem("accessToken", response);
        set({ isAuthenticated: true, token: response });
        await get().fetchClasses();
      }
    } catch (e) {
      console.log(e);
    }
  },

  logout: () => {
    try {
      localStorage.removeItem("accessToken");
      set({ isAuthenticated: false, token: null });
    } catch (e) {
      console.log(error);
    }
  },

  fetchClasses: async () => {
    const response = await api.get("teacher/getClasses");
    try {
      set({ classes: response });
    } catch (e) {
      console.log(e);
    }
  },

  fetchClassWithStudent: async (className) => {
    const response = await api.get(`teacher/getClassByName?name=${className}`);
    const sortedStudents = await response.students.sort((a, b) => {
      const result = a.lastName.localeCompare(b.lastName);
      return result !== 0 ? result : a.firstName.localeCompare(b.firstName);
    });
    const sortedSubjects = await response.subjects.sort((a, b) =>
      a.localeCompare(b)
    );

    try {
      set({
        students: sortedStudents || [],
        selectedClass: response.className,
        subjects: sortedSubjects,
        selectedStudentId: "",
      });
      console.log(localStorage.getItem("accessToken"));
    } catch (e) {
      console.log(e);
    }
  },

  deleteGrade: async (gradeId, studentId) => {
    try {
      await api.delete(
        `teacher/deleteGrade?gradeId=${gradeId}&studentId=${studentId}`
      );
      set((state) => ({
        students: state.students.map((student) => ({
          ...student,
          grades: student.grades.map((subjectGroup) => ({
            ...subjectGroup,
            grades: subjectGroup.grades.filter((g) => g.gradeId !== gradeId),
          })),
        })),
      }));
      console.log(get().students);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDatastore;

// export const postService = {
//   getAllPosts: async () => {
//     const response = await api.get("/posts");
//     return response.slice(0, 5);
//   },

//   getPostById: async (id) => {
//     const response = await api.get(`/posts/${id}`);
//     return response;
//   },

//   createPost: async (post) => {
//     const response = await api.post("/posts", post);
//     return response;
//   },

//   updatePost: async (id, post) => {
//     const response = await api.put(`/posts/${id}`, post);
//     return response;
//   },

//   deletePost: async (id) => {
//     const response = await api.delete(`/posts/${id}`);
//     return response;
//   },
// };

//fetchPosts: async () => {
//   try {
//     set({ loading: true });
//     const response = await api.get("/posts");
//     set({ posts: response.slice(0, 5), error: null });
//   } catch (error) {
//     set({ error: "Failed to fetch posts" });
//     console.error("Error:", error);
//   } finally {
//     set({ loading: false });
//   }
// },
