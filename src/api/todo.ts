import axios from "axios";
interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<ITodo[]> => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
