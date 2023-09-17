import { ref } from "vue";
import axios from "axios";
import { IPost } from "../model/post";

function usePost() {
  const url = "https://jsonplaceholder.typicode.com/posts/";

  const postList = ref<Array<IPost>>([]);
  const fetchPostList = async () => {
    const { data } = await axios.get(url);
    postList.value = data;
  };

  const postDetail = ref<IPost>();
  const fetchPostById = async (id: string) => {
    const { data } = await axios.get(`${url}${id}`);
    postDetail.value = data;
  };

  return { postList, postDetail, fetchPostList, fetchPostById };
}

export default usePost;
