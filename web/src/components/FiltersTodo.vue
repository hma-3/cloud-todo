<script setup lang="ts">
defineProps<{
  disabled: boolean;
  statusFilter: string;
  priorityFilter: string;
}>();

defineEmits<{
  (e: 'update:statusFilter', value: Event): void;
  (e: 'update:priorityFilter', value: Event): void;
}>();
</script>

<template>
  <div class="filters">
    <select
      :disabled
      v-bind:value="statusFilter"
      v-on:change="$emit('update:statusFilter', $event)"
      class="filters__select"
    >
      <option value="">All statuses</option>
      <option value="NEW">New</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="DONE">Done</option>
    </select>

    <select
      :disabled
      v-bind:value="priorityFilter"
      v-on:change="$emit('update:priorityFilter', $event)"
      class="filters__select"
    >
      <option value="">All priorities</option>
      <option value="LOW">Low</option>
      <option value="MEDIUM">Medium</option>
      <option value="HIGH">High</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  &__select {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.625rem 0.75rem;
    font: inherit;
  }
}
</style>
