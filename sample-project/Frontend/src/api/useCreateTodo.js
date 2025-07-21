import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import react, { useContext } from "react";

const createTodoAPI = async (todoData) => {
  const responce = await axios.post(
    "http://localhost:8000/todo/create",
    todoData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return responce.json;
};

const useCreateTodo = async () => {
  return useMutation({
    mutationFn: createTodoAPI,
    onSuccess: (data) => {
      console.log("Todo created! Invalidating 'data' query...");
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
    onError: (error) => {
      console.log({ status: "failed" });
    },
  });
};

export default useCreateTodo;
