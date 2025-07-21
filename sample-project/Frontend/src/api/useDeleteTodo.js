import axios from "axios";
import { dataTagErrorSymbol, useMutation, useQueryClient } from "@tanstack/react-query";


const deleteTodoAPI = async (todoId) => {
  const { data } = await axios.delete(`${API_URL}/todo/delete/${todoId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
  return data;
};


const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
      alert("Could not Delete the todo. Please try again.");
    },
  });
};


export default useDeleteTodo;