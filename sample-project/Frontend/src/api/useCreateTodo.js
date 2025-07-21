import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// This is your API function
const createTodoAPI = async (newTodo) => {
  const { data } = await axios.post(`${API_URL}/todo/create`, newTodo, {
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