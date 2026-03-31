import { reactive, ref, watch } from "vue";
import type { Todo, TodoPriority } from "../types/todo";
import { createTodo } from "../api/todos";
import type { Alert } from "../types/alert";

export function useAddTodo() {
  const alert = reactive<Alert>({
    show: false,
    color: "success",
    message: "",
  });
  const isLoading = ref(false);
  const formTitle = ref("");
  const formDescription = ref("");
  const formPriority = ref<TodoPriority>("MEDIUM");
  const formDueDate = ref("");

  const getNewTodo = (): Omit<Todo, "id" | "createdAt" | "updatedAt"> => {
    return {
      title: formTitle.value.trim(),
      description: formDescription.value.trim() || undefined,
      priority: formPriority.value,
      dueDate: formDueDate.value || undefined,
      status: "NEW",
    };
  };

  const resetForm = () => {
    formTitle.value = "";
    formDescription.value = "";
    formPriority.value = "MEDIUM";
    formDueDate.value = "";
  };

  const addTodo = async (onTodoAdded: () => void) => {
    const newTodo = getNewTodo();

    if (!newTodo.title) {
      alert.show = true;
      alert.color = "danger";
      alert.message = "Title is required";
      return;
    }

    try {
      await createTodo(newTodo);

      resetForm();

      onTodoAdded();

      alert.show = true;
      alert.color = "success";
      alert.message = "Todo added successfully";
    } catch {
      alert.show = true;
      alert.color = "danger";
      alert.message = "Could not create todo.";
    }
  };

  watch(alert, (newAlert) => {
    if (newAlert.show) {
      setTimeout(() => {
        newAlert.show = false;
      }, 3000);
    }
  });

  return {
    alert,
    isLoading,
    formTitle,
    formDescription,
    formPriority,
    formDueDate,
    addTodo,
  };
}
