import { computed, reactive, ref, watch } from "vue";
import type { Todo, TodoPriority, TodoStatus } from "../types/todo";
import {
  getTodos,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "../api/todos";
import type { Alert } from "../types/alert";

export function useTodos() {
  const alert = reactive<Alert>({
    show: false,
    color: "success",
    message: "",
  });
  const todos = ref<Todo[]>([]);
  const isLoading = ref(false);
  const statusFilter = ref<TodoStatus | "">("");
  const priorityFilter = ref<TodoPriority | "">("");

  const remainingCount = computed(
    () => todos.value.filter((todo) => todo.status !== "DONE").length,
  );

  const loadTodos = async () => {
    isLoading.value = true;

    const searchParams = new URLSearchParams();

    if (statusFilter.value) {
      searchParams.set("status", statusFilter.value);
    }

    if (priorityFilter.value) {
      searchParams.set("priority", priorityFilter.value);
    }

    try {
      const response = await getTodos(searchParams.toString());
      todos.value = response;
    } catch {
      alert.show = true;
      alert.color = "danger";
      alert.message = "Could not load todos from API.";
    } finally {
      isLoading.value = false;
    }
  };

  const updateTodo = async (todoId: Todo["id"], updateData: Partial<Todo>) => {
    try {
      await updateTodoApi({ id: todoId, ...updateData });

      await loadTodos();
    } catch {
      alert.show = true;
      alert.color = "danger";
      alert.message = "Could not update todo.";
    }
  };

  const deleteTodo = async (todoId: Todo["id"]) => {
    try {
      await deleteTodoApi(todoId);
      await loadTodos();
    } catch {
      alert.show = true;
      alert.color = "danger";
      alert.message = "Could not delete todo.";
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
    todos,
    remainingCount,
    isLoading,
    statusFilter,
    priorityFilter,
    loadTodos,
    updateTodo,
    deleteTodo,
  };
}
