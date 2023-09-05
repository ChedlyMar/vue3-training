import { reactive, ref } from "vue";

const taskList = ref<Array<string>>([]);
const selectedTask = ref<string>("");

export const useTask = () => {
  const addTask = (task: string) => {
    taskList.value.push(task);
  };

  const deleteTask = (task: string) => {
    taskList.value.splice(taskList.value.indexOf(task), 1);
  };

  const selectTask = (task: string) => {
    selectedTask.value = task;
  };

  return { taskList, selectedTask, addTask, deleteTask, selectTask };
};
