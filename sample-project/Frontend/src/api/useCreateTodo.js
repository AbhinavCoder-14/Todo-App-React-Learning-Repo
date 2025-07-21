import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// This is your API function
const createTodoAPI = async (newTodo) => {
  const { data } = await axios.post("http://localhost:8000/todo/create", newTodo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
  return data;
};

// This is your custom hook
const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.error("Failed to create todo:", error);
      alert("Could not create the todo. Please try again.");
    },
  });
};

export default useCreateTodo;