<script setup lang="ts">
import type { TodoPriority, TodoStatus } from "../types/todo";
import { useTodos } from "../composables/useTodos";
import { onMounted } from "vue";
import FiltersTodo from "./FiltersTodo.vue";

const {
  todos,
  remainingCount,
  isLoading,
  loadTodos,
  statusFilter,
  priorityFilter,
  updateTodo,
  deleteTodo,
  alert,
} = useTodos();

const onStatusChange = (todoId: string, target: EventTarget | null) => {
  const newStatus = (target as HTMLSelectElement).value as TodoStatus;
  updateTodo(todoId, { status: newStatus });
};

const onSetStatusFilter = (event: Event) => {
  statusFilter.value = (event.target as HTMLSelectElement).value as TodoStatus;
  loadTodos();
};

const onSetPriorityFilter = (event: Event) => {
  priorityFilter.value = (event.target as HTMLSelectElement)
    .value as TodoPriority;
  loadTodos();
};

onMounted(() => {
  loadTodos();
});
</script>

<template>
  <Alert :show="alert.show" :color="alert.color" :message="alert.message" />

  <h2 class="todos-title">All Todos</h2>
  <p class="todos-subtitle">Remaining todos: {{ remainingCount }}</p>

  <FiltersTodo
    :disabled="isLoading || !todos.length"
    :statusFilter
    :priorityFilter
    @update:statusFilter="onSetStatusFilter"
    @update:priorityFilter="onSetPriorityFilter"
  />

  <p v-if="isLoading" class="todos-hint">Loading todos...</p>
  <p v-else-if="todos.length === 0" class="todos-hint">No todos yet.</p>

  <ul v-else class="todos-list">
    <li v-for="todo in todos" :key="todo.id" class="todos-item">
      <div class="todos-item__header">
        <div
          class="todos-item__title"
          :class="{ 'todos-item__title--done': todo.status === 'DONE' }"
        >
          <img
            :src="`icons/${todo.priority.toLowerCase()}-priority.svg`"
            alt="Priority"
            class="todos-item__priority-icon"
          >
          <strong>{{ todo.title }}</strong>
        </div>

        <span class="todos-item__due-date">
          {{ todo.dueDate ? todo.dueDate.slice(0, 10) : 'Anytime' }}
        </span>
      </div>

      <div v-if="todo.description" class="todos-hint">
        {{ todo.description }}
      </div>

      <div class="todos-item__actions">
        <select
          class="todos-item__status-select"
          :value="todo.status"
          @change="(event) => onStatusChange(todo.id, event.target)"
        >
          <option value="NEW">New</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <button
          class="todos-item__delete-button"
          type="button"
          @click="() => deleteTodo(todo.id)"
        >
          Delete
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.todos-title {
  margin-block: 0.5rem 0;
  font-size: 1.25rem;
}

.todos-subtitle {
  margin-block: 0 1rem;
  color: #4b5563;
}

.todos-hint {
  color: #6b7280;
  margin: 0.5rem 0;
}

.todos-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todos-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;

    &--done {
      color: #6b7280;
      text-decoration: line-through;
    }
  }

  &__priority-icon {
    width: 1em;
    height: 1em;
  }

  &__due-date {
    color: #4b5563;
    font-size: 0.95rem;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  &__status-select {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.35rem 0.6rem;
    font: inherit;
    flex: 2;
  }

  &__delete-button {
    border: 1px solid #ef4444;
    border-radius: 8px;
    background: #ffffff;
    color: #b91c1c;
    padding: 0.35rem 0.6rem;
    font: inherit;
    cursor: pointer;
    flex: 1;
  }
}
</style>
