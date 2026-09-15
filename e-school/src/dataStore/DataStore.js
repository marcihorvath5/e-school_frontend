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
  loginError: null,
  clearLoginError: () => set({ loginError: null }),
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
      set({ loginError: null });
      const response = await api.post("user/login", { email, password });
      const token = typeof response === "string" ? response : response?.token;
      if (token && token.length > 20) {
        localStorage.setItem("accessToken", token);
        set({ isAuthenticated: true, token });
        await get().fetchClasses();
      } else {
        set({ loginError: "Hibás email cím vagy jelszó." });
      }
    } catch (e) {
      set({ loginError: "Hibás email cím vagy jelszó." });
    }
  },

  logout: () => {
    try {
      localStorage.removeItem("accessToken");
      set({
        isAuthenticated: false,
        token: null,
        loginError: null,
        classes: [],
        students: [],
        selectedClass: "",
        selectedStudentId: "",
        subjects: [],
      });
    } catch (e) {
      console.log(e);
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
      a.name.localeCompare(b.name)
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

  addGrade: async (studentId, subject, gradeValue) => {
    try {
      const newGrade = await api.post("teacher/AddGrade", null, {
        params: {
          value: gradeValue,
          studentId,
          teacherId: "6bc4243a-c080-43fe-8aa8-c0d811540258",
          subjectId: subject.id,
        },
      });
      set((state) => ({
        students: state.students.map((student) => {
          if (student.id !== studentId) return student;
          const hasSubject = student.grades.some(
            (g) => g.subjectName === subject.name
          );
          const grades = hasSubject
            ? student.grades.map((subjectGroup) =>
                subjectGroup.subjectName === subject.name
                  ? {
                      ...subjectGroup,
                      grades: [...subjectGroup.grades, newGrade],
                    }
                  : subjectGroup
              )
            : [
                ...student.grades,
                { subjectName: subject.name, grades: [newGrade] },
              ];
          return { ...student, grades };
        }),
      }));
    } catch (error) {
      console.log("addGrade failed:", error.response?.data ?? error);
    }
  },

  updateGrade: async (gradeId, newValue) => {
    try {
      await api.put("teacher/ModifyGrade", null, {
        params: { gradeId, newValue },
      });
      set((state) => ({
        students: state.students.map((student) => ({
          ...student,
          grades: student.grades.map((subjectGroup) => ({
            ...subjectGroup,
            grades: subjectGroup.grades.map((g) =>
              g.gradeId === gradeId ? { ...g, gradeValue: newValue } : g
            ),
          })),
        })),
      }));
    } catch (error) {
      console.log("updateGrade failed:", error.response?.data ?? error);
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
