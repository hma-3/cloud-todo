<script setup lang="ts">
import AddTodo from "./components/AddTodo.vue";
import AllTodos from "./components/AllTodos.vue";
</script>

<template>
  <main class="layout">
    <section class="card">
      <h1 class="title">Cloud ToDo App</h1>
      <AddTodo />
      <AllTodos />
    </section>
  </main>
</template>


<style scoped>
.title {
  margin: 0;
  font-size: 1.5rem;
  text-align: center;
}
</style>
