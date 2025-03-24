import api from "./axios";

const apiCall = {
  fetchPosts: async () => {
    try {
      set({ loading: true });
      const response = await api.get("/posts");
      set({ posts: response.slice(0, 5), error: null });
    } catch (error) {
      set({ error: "Failed to fetch posts" });
      console.error("Error:", error);
    } finally {
      set({ loading: false });
    }
  },
};

export default apiCall;

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
