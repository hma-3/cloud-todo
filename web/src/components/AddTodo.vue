<script setup lang="ts">
import { useAddTodo } from "../composables/useAddTodo";
import { useTodos } from "../composables/useTodos";
import Alert from "./Alert.vue";

const { loadTodos } = useTodos();

const {
  alert,
  isLoading,
  formTitle,
  formDescription,
  formPriority,
  formDueDate,
  addTodo,
} = useAddTodo();
</script>

<template>
  <Alert :show="alert.show" :color="alert.color" :message="alert.message" />

  <section class="add-todo">
    <h2 class="add-todo__title">Add Todo</h2>

    <form class="add-todo__form" @submit.prevent="() => addTodo(loadTodos)">
      <label class="add-todo__field">
        <span>Title<span class="add-todo__required">*</span></span>
        <input
          v-model="formTitle"
          class="add-todo__input"
          type="text"
          placeholder="To something"
          required
          :minlength="3"
          :maxlength="120"
          :disabled="isLoading"
        />
      </label>

      <div class="add-todo__field-row">
        <label class="add-todo__field">
          <span>Priority<span class="add-todo__required">*</span></span>
          <select
            v-model="formPriority"
            class="add-todo__input"
            required
            :disabled="isLoading"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>

        <label class="add-todo__field">
          <span>Due Date</span>
          <input
            v-model="formDueDate"
            class="add-todo__input"
            type="date"
            :disabled="isLoading"
          />
        </label>
      </div>

      <label class="add-todo__field">
        <span>Description</span>
        <textarea
          v-model="formDescription"
          class="add-todo__input"
          maxlength="500"
          placeholder="Describe the task"
          :disabled="isLoading"
        />
      </label>

      <button class="add-todo__submit" type="submit" :disabled="isLoading">
        Add
      </button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.add-todo {
  &__title {
    margin-block: 0.5rem;
    font-size: 1.25rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__field-row {
    display: flex;
    gap: 0.5rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
  }

  &__input {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.625rem 0.75rem;
    font: inherit;
  }

  &__submit {
    border: none;
    border-radius: 8px;
    padding: 0.625rem 0.95rem;
    background: #111827;
    color: #ffffff;
    font: inherit;
    cursor: pointer;
  }

  &__required {
    color: #b91c1c;
  }
}
</style>
