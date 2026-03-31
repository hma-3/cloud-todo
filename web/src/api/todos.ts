import { API_BASE_URL, API_KEY } from "../constants/api";
import type { Todo } from "../types/todo";

const parseJsonIfPresent = async (response: Response) => {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
};

export const getTodos = async (query = "") => {
  const response = await fetch(
    `${API_BASE_URL}/api/tasks${query ? `?${query}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Failed to load tasks.");
  }

  return parseJsonIfPresent(response);
};

export const createTodo = async (
  todo: Omit<Todo, "id" | "createdAt" | "updatedAt">,
) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Failed to create task.");
  }

  return parseJsonIfPresent(response);
};

export const updateTodo = async ({ id, ...data }: Partial<Todo>) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task.");
  }

  return parseJsonIfPresent(response);
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "X-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task.");
  }

  return parseJsonIfPresent(response);
};
