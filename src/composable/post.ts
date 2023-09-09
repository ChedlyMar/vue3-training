import { ref } from "vue";
import axios from "axios";

const postList = ref<Array<any>>([]);
const selectedPost = ref<any>(null);

export function usePost() {
  const uri = "https://jsonplaceholder.typicode.com/posts/";

  const fetchPostList = async () => {
    try {
      const { data } = await axios.get(uri);
      postList.value = { ...data };
    } catch (error) {
      throw error;
    }
  };

  const fetchPostById = async (id: string) => {
    try {
      const { data } = await axios.get(`${uri}${id}`);
      selectedPost.value = data;
    } catch (error) {
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await axios.delete(`${uri}${postId}`);
      fetchPostList();
    } catch (error) {
      throw error;
    }
  };

  return { postList, selectedPost, fetchPostList, fetchPostById, deletePost };
}
